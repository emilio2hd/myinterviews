import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { CoverLetter } from '../cover-letter';
import { CoverLetterApiService } from '../cover-letter.api.service';
import { EmailSenderComponent } from '../email-sender/email-sender.component';

@Component({
  selector: 'app-editor-drawer',
  templateUrl: './editor-drawer.component.html',
  styleUrls: ['./editor-drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorDrawerComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  Editor = ClassicEditor;
  contentPreview = '';
  coverLetterForm = this.formBuilder.group({
    id: [''],
    title: ['', [Validators.required]],
    content: ['', [Validators.required]],
  });

  config = {
    removePlugins: ['ImageUpload', 'ImageToolbar', 'ImageStyle', 'ImageCaption', 'Image'],
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'indent',
        'outdent',
        '|',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'undo',
        'redo',
      ],
    },
  };

  @Output() formValid = new EventEmitter<boolean>();
  @Input() set coverLetter(coverLetter: CoverLetter) {
    this.coverLetterForm.patchValue(coverLetter);
  }

  constructor(
    private drawerRef: NzDrawerRef<CoverLetter>,
    private formBuilder: FormBuilder,
    private coverLetterService: CoverLetterApiService,
    private notificationService: NzNotificationService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.coverLetterForm.valueChanges.subscribe(() => {
        this.formValid.emit(this.coverLetterForm.valid);
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  saveAsCopy() {
    if (!this.coverLetterForm.valid) {
      return;
    }

    const { id, ...coverLetterClone } = this.coverLetterForm.value as CoverLetter;

    this.subscriptions.add(
      this.coverLetterService.create(coverLetterClone).subscribe(() => {
        this.notificationService.create(
          'success',
          'Cover Letter',
          `"${coverLetterClone.title}" saved as new`
        );

        this.drawerRef.close({ refresh: true });
      })
    );
  }

  sendEmail() {
    const coverLetter = this.coverLetterForm.value as CoverLetter;

    this.modalService.create({
      nzTitle: 'Send cover letter',
      nzMaskClosable: false,
      nzKeyboard: false,
      nzClosable: false,
      nzWidth: 700,
      nzComponentParams: { coverLetter },
      nzContent: EmailSenderComponent,
    });
  }

  submitForm() {
    if (!this.coverLetterForm.valid) {
      return;
    }

    const coverLetter = this.coverLetterForm.value as CoverLetter;

    if (coverLetter.id) {
      this.subscriptions.add(
        this.coverLetterService
          .update(coverLetter)
          .subscribe(this.getCallbacks(coverLetter, 'updated'))
      );
    } else {
      this.subscriptions.add(
        this.coverLetterService
          .create(coverLetter)
          .subscribe(this.getCallbacks(coverLetter, 'created'))
      );
    }
  }

  private createNotification(type: 'success' | 'error', message: string) {
    this.notificationService.create(type, 'Cover Letter', message);
  }

  private getCallbacks(coverLetter: CoverLetter, action: string) {
    return {
      next: () => {
        this.createNotification('success', `"${coverLetter.title}" successfully ${action}`);
        this.drawerRef.close({ refresh: true });
      },
      error: () => {
        this.createNotification(
          'error',
          `Uh-oh! Something wrong has happened. Unable to save "${coverLetter.title}"`
        );
      },
    };
  }
}
