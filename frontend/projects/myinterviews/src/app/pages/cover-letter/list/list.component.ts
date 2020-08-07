import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, pipe } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

import { CoverLetterService, CoverLetter } from '..';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class CoverLetterListComponent implements OnInit {
  private paginationParamsSubject = new BehaviorSubject<{ pageIndex: number }>({
    pageIndex: 1,
  });
  private paginationParams$ = this.paginationParamsSubject.asObservable();
  private getAllCoverLetters$ = pipe(
    tap((_) => (this.loading = true)),
    switchMap(({ pageIndex }) =>
      this.coverLetterService.getAll(pageIndex).pipe(tap(() => (this.loading = false)))
    )
  );

  loading = true;
  coverLetter$ = this.getAllCoverLetters$(this.paginationParams$);

  constructor(
    private coverLetterService: CoverLetterService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {}

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.paginationParamsSubject.next(params);
  }

  onDeleteConfirm(coverLetter: CoverLetter) {
    this.notification.create(
      'success',
      'Applications',
      `"${coverLetter.title}" successfully deleted`
    );
  }
}
