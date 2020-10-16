import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, pipe } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

import { InterviewService } from '../interview.service';
import { Interview, InterviewTypeMapping } from '../interview.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class InterviewListComponent implements OnInit {
  private paginationParamsSubject = new BehaviorSubject<{ pageIndex: number }>({
    pageIndex: 1,
  });
  private paginationParams$ = this.paginationParamsSubject.asObservable();
  private getAllInterviews$ = pipe(
    tap((_) => (this.loading = true)),
    switchMap(({ pageIndex }) =>
      this.interviewService.getAll(pageIndex).pipe(tap(() => (this.loading = false)))
    )
  );

  loading = true;
  interview$ = this.getAllInterviews$(this.paginationParams$);

  constructor(
    private interviewService: InterviewService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {}

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.paginationParamsSubject.next(params);
  }

  onDeleteConfirm(interview: Interview) {
    this.interviewService.delete(interview.id).subscribe({
      next: () => {
        const currentParams = this.paginationParamsSubject.value;
        this.paginationParamsSubject.next({ ...currentParams });

        this.notification.create(
          'success',
          'Applications',
          `Interview with "${interview.interviewerName}" successfully deleted`
        );
      },
      error: () =>
        this.notification.error(
          'Cover Letter',
          `Uh-oh! Something wrong has happened. Unable to delete interview with "${interview.interviewerName}"`
        ),
    });
  }

  getTypeOfText(typeOf: string) {
    return InterviewTypeMapping[typeOf];
  }
}
