import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BehaviorSubject, pipe } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';

import { CoverLetterService, CoverLetter } from '..';
import { EditorDrawerComponent } from '../editor-drawer/editor-drawer.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EmailSenderComponent } from '../email-sender/email-sender.component';

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

  @ViewChild('drawerTitle', { static: false }) drawerTitle?: TemplateRef<{}>;

  loading = true;
  coverLetter$ = this.getAllCoverLetters$(this.paginationParams$);
  coverLetterOnFocus: CoverLetter;
  drawerRef: NzDrawerRef<EditorDrawerComponent, { coverLetter?: CoverLetter; refresh: boolean }>;

  constructor(
    private coverLetterService: CoverLetterService,
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

        this.notification.create(
          'success',
          'Applications',
          `"${coverLetter.title}" successfully deleted`
        );

        if (this.drawerRef) {
          this.drawerRef.close({ refresh: true });
        }
      },
      error: () =>
        this.notification.error(
          'Cover Letter',
          `Uh-oh! Something wrong has happened. Unable to delete "${coverLetter.title}"`
        ),
    });
  }
}
