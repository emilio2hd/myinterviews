import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, pipe, Subscription } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';

import { NzNotificationService } from 'ng-zorro-antd/notification';

import { JobApplicationApiService } from '../job-application.api.service';
import {
  JobApplication,
  JobApplicationStatusMapping,
  JobApplicationStatusEnum,
} from '../job-application.model';

@Component({
  selector: 'app-job-application-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class JobApplicationListComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  private paginationParams$ = new BehaviorSubject<number>(1);

  private getAllApplications$ = pipe(
    tap(() => (this.loading = true)),
    switchMap((page: number) =>
      this.jobApplicationService
        .getPaginatedResults(page)
        .pipe(finalize(() => (this.loading = false)))
    )
  );

  jobApplications$ = this.getAllApplications$(this.paginationParams$.asObservable());

  total: number;
  jobApplications: JobApplication[];
  pageSize: number;
  pageIndex: number;
  loading: boolean;

  trackById = (_: number, item: JobApplication) => item.id;

  constructor(
    private jobApplicationService: JobApplicationApiService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.jobApplications$.subscribe((paginatedResult) => {
        this.total = paginatedResult.totalCount;
        this.pageSize = paginatedResult.pageSize;
        this.pageIndex = paginatedResult.currentPage;
        this.jobApplications = paginatedResult.data;
      })
    );
  }

  onPageIndexChange(nextPage: number) {
    this.paginationParams$.next(nextPage);
  }

  getStatusText(status: JobApplicationStatusEnum) {
    return JobApplicationStatusMapping[status];
  }

  onDeleteConfirm(jobApplication: JobApplication) {
    this.subscriptions.add(
      this.jobApplicationService.delete(jobApplication.id).subscribe({
        next: () => {
          this.paginationParams$.next(1);

          this.notification.success(
            'Job Application',
            `"${jobApplication.position}" successfully deleted`
          );
        },
        error: () =>
          this.notification.error(
            'Job Application',
            `Uh-oh! Something wrong has happened. Unable to delete "${jobApplication.position}"`
          ),
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
