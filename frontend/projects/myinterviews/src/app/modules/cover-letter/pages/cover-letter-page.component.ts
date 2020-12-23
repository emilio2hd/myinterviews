import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BehaviorSubject, pipe } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';

import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';

import { CoverLetter } from '@core/models';

import { CoverLetterApiService } from '../services';
import { EditorDrawerComponent, EmailSenderComponent } from '../components';

@Component({
  selector: 'app-cover-letter-page',
  templateUrl: './cover-letter-page.component.html',
  styleUrls: ['./cover-letter-page.component.scss'],
})
export class CoverLetterPageComponent implements OnInit {
  private paginationParamsSubject = new BehaviorSubject<{ pageIndex: number }>({
    pageIndex: 1,
  });
  private paginationParams$ = this.paginationParamsSubject.asObservable();
  private getAllCoverLetters$ = pipe(
    tap(() => (this.loading = true)),
    switchMap(({ pageIndex }) =>
      this.coverLetterService
        .getPaginatedResults(pageIndex)
        .pipe(finalize(() => (this.loading = false)))
    )
  );

  @ViewChild('drawerTitle', { static: false }) drawerTitle?: TemplateRef<{}>;

  loading = true;
  coverLetter$ = this.getAllCoverLetters$(this.paginationParams$);
  coverLetterOnFocus: CoverLetter;
  drawerRef: NzDrawerRef<EditorDrawerComponent, { coverLetter?: CoverLetter; refresh: boolean }>;

  constructor(
    private coverLetterService: CoverLetterApiService,
    private notification: NzNotificationService,
    private drawerService: NzDrawerService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {}

  onNewClick() {
    this.onEditClick({} as CoverLetter);
  }

  onEditClick(coverLetter: CoverLetter) {
    this.drawerRef = this.drawerService.create<
      EditorDrawerComponent,
      { coverLetter: CoverLetter },
      { coverLetter: CoverLetter; refresh: boolean }
    >({
      nzWidth: 680,
      nzTitle: this.drawerTitle,
      nzClosable: false,
      nzContent: EditorDrawerComponent,
      nzContentParams: { coverLetter },
    });

    this.coverLetterOnFocus = coverLetter;

    this.drawerRef.afterClose.subscribe((closeResult = { refresh: false }) => {
      this.coverLetterOnFocus = undefined;

      if (closeResult.refresh) {
        this.paginationParamsSubject.next({ pageIndex: 1 });
      }
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.paginationParamsSubject.next(params);
  }

  onSendClick(coverLetter: CoverLetter): void {
    this.modalService.create({
      nzTitle: 'Send cover letter',
      nzMaskClosable: false,
      nzKeyboard: false,
      nzClosable: false,
      nzWidth: 700,
      nzComponentParams: {
        coverLetter,
      },
      nzContent: EmailSenderComponent,
    });
  }

  onDeleteConfirm(coverLetter: CoverLetter) {
    this.coverLetterService.delete(coverLetter.id).subscribe({
      next: () => {
        const currentParams = this.paginationParamsSubject.value;
        this.paginationParamsSubject.next({ ...currentParams });

        this.notification.success('Cover Letter', `"${coverLetter.title}" successfully deleted`);

        if (this.drawerRef) {
          this.drawerRef.close({ refresh: true });
        }
      },
    });
  }
}
