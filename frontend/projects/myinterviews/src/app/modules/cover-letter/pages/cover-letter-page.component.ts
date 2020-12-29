import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { BehaviorSubject, pipe, Subscription } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';

import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';

import { CoverLetter } from '@core/models';

import { CoverLetterApiService } from '../services';
import { EditorDrawerComponent, EmailSenderComponent } from '../components';

@Component({
  selector: 'app-cover-letter-page',
  templateUrl: './cover-letter-page.component.html',
  styleUrls: ['./cover-letter-page.component.scss'],
})
export class CoverLetterPageComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  private paginationParams$ = new BehaviorSubject<number>(1);
  private getAllCoverLetters$ = pipe(
    tap(() => (this.loading = true)),
    switchMap((page: number) =>
      this.coverLetterService.getPaginatedResults(page).pipe(finalize(() => (this.loading = false)))
    )
  );

  @ViewChild('drawerTitle', { static: false }) drawerTitle?: TemplateRef<{}>;

  coverLetter$ = this.getAllCoverLetters$(this.paginationParams$.asObservable());
  coverLetterOnFocus: CoverLetter;
  drawerRef: NzDrawerRef<EditorDrawerComponent, { coverLetter?: CoverLetter; refresh: boolean }>;

  total: number;
  coverLetters: CoverLetter[];
  pageSize: number;
  pageIndex: number;
  loading: boolean;

  trackById = (_: number, item: CoverLetter) => item.id;

  constructor(
    private coverLetterService: CoverLetterApiService,
    private notification: NzNotificationService,
    private drawerService: NzDrawerService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.coverLetter$.subscribe((paginatedResult) => {
        this.total = paginatedResult.totalCount;
        this.pageSize = paginatedResult.pageSize;
        this.pageIndex = paginatedResult.currentPage;
        this.coverLetters = paginatedResult.data;
      })
    );
  }

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

    this.subscriptions.add(
      this.drawerRef.afterClose.subscribe((closeResult = { refresh: false }) => {
        this.coverLetterOnFocus = undefined;

        if (closeResult.refresh) {
          this.paginationParams$.next(1);
        }
      })
    );
  }

  onPageIndexChange(nextPage: number) {
    this.paginationParams$.next(nextPage);
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
    this.subscriptions.add(
      this.coverLetterService.delete(coverLetter.id).subscribe({
        next: () => {
          this.paginationParams$.next(1);

          this.notification.success('Cover Letter', `"${coverLetter.title}" successfully deleted`);

          if (this.drawerRef) {
            this.drawerRef.close({ refresh: true });
          }
        },
        error: () => {
          this.notification.error(
            'Cover Letter',
            `Uh-oh! Something wrong has happened. Unable to delete "${coverLetter.title}"`
          );
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
