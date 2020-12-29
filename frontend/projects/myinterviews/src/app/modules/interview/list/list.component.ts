import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, pipe, Subscription } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';

import { NzNotificationService } from 'ng-zorro-antd/notification';

import { InterviewApiService } from '../interview.api.service';
import { Interview, InterviewTypeMapping } from '../interview.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class InterviewListComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  private paginationParams$ = new BehaviorSubject<number>(1);
  private getAllInterviews$ = pipe(
    tap(() => (this.loading = true)),
    switchMap((page: number) =>
      this.interviewService.getPaginatedResults(page).pipe(finalize(() => (this.loading = false)))
    )
  );

  interview$ = this.getAllInterviews$(this.paginationParams$.asObservable());

  total: number;
  interviews: Interview[];
  pageSize: number;
  pageIndex: number;
  loading: boolean;

  trackById = (_: number, item: Interview) => item.id;

  constructor(
    private interviewService: InterviewApiService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.interview$.subscribe((paginatedResult) => {
        this.total = paginatedResult.totalCount;
        this.pageSize = paginatedResult.pageSize;
        this.pageIndex = paginatedResult.currentPage;
        this.interviews = paginatedResult.data;
      })
    );
  }

  onPageIndexChange(nextPage: number) {
    this.paginationParams$.next(nextPage);
  }

  onDeleteConfirm(interview: Interview) {
    this.subscriptions.add(
      this.interviewService.delete(interview.id).subscribe({
        next: () => {
          this.paginationParams$.next(1);

          this.notification.success(
            'Interviews',
            `Interview "${interview.interviewerName}" successfully deleted`
          );
        },
        error: () =>
          this.notification.error(
            'Interviews',
            `Uh-oh! Something wrong has happened. Unable to delete "${interview.interviewerName}"`
          ),
      })
    );
  }

  getTypeOfText(typeOf: string) {
    return InterviewTypeMapping[typeOf];
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
