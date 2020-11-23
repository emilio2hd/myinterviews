import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, pipe } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

import { JobApplicationService } from '../job-application.service';
import {
  JobApplication,
  JobApplicationStatusMapping,
  JobApplicationStatusEnum,
} from '../job-application';

@Component({
  selector: 'app-job-application-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class JobApplicationListComponent implements OnInit {
  private paginationParamsSubject = new BehaviorSubject<{ pageIndex: number }>({
    pageIndex: 1,
  });
  private paginationParams$ = this.paginationParamsSubject.asObservable();
  private getAllApplications$ = pipe(
    tap((_) => (this.loading = true)),
    switchMap(({ pageIndex }) =>
      this.jobApplicationService
        .getPaginatedResults(pageIndex)
        .pipe(tap(() => (this.loading = false)))
    )
  );

  loading = true;
  result$ = this.getAllApplications$(this.paginationParams$);

  trackById = (_: number, item: JobApplication) => item.id;

  constructor(
    private jobApplicationService: JobApplicationService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {}

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.paginationParamsSubject.next(params);
  }

  getStatusText(status: JobApplicationStatusEnum) {
    return JobApplicationStatusMapping[status];
  }

  onDeleteConfirm(jobApplication: JobApplication) {
    this.jobApplicationService.delete(jobApplication.id).subscribe({
      next: () => {
        const currentParams = this.paginationParamsSubject.value;
        this.paginationParamsSubject.next({ ...currentParams });

        this.notification.create(
          'success',
          'Job Application',
          `"${jobApplication.position}" successfully deleted`
        );
      },
      error: () =>
        this.notification.error(
          'Job Application',
          `Uh-oh! Something wrong has happened. Unable to delete "${jobApplication.position}"`
        ),
    });
  }
}
