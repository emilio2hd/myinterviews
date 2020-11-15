import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';

import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as _ from 'lodash';

import { APP_SETTINGS } from '@app/app.token';
import { Settings, CoverLetter } from '@core/models';

import { CoverLetterApiService } from '../services';

@Component({
  selector: 'app-email-sender',
  templateUrl: './email-sender.component.html',
  styleUrls: ['./email-sender.component.scss'],
})
export class EmailSenderComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  isModalOpen = false;
  sending = false;
  Editor = ClassicEditor;
  emailForm: FormGroup = this.fb.group({
    coverLetterId: [],
    emailTo: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required]],
    message: ['', [Validators.required]],
    attachment: [''],
    hasSettings: [], // hidden value just to disable the form if has no settings
  });

  hasNoSettings$ = this.settings$.pipe(
    map((settings) => !settings.valid),
    tap((hasNoSettings) => {
      if (hasNoSettings) {
        this.emailForm.get('hasSettings').setErrors({ incorrect: true });
      }
    }),
    shareReplay(1)
  );

  @Input() set coverLetter(coverLetter: CoverLetter) {
    if (coverLetter) {
      this.emailForm.get('coverLetterId').setValue(coverLetter.id);
      this.emailForm.get('message').setValue(coverLetter.content);
      this.emailForm.get('subject').setValue(coverLetter.title);
    }
  }

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

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private coverLetterService: CoverLetterApiService,
    private notificationService: NzNotificationService,
    @Inject(APP_SETTINGS) public settings$: Observable<Settings>
  ) {}

  ngOnInit(): void {
    // workaround to display ckeditor toolbar ungrouped
    this.modal.afterOpen.subscribe(() => (this.isModalOpen = true));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  destroyModal(): void {
    this.modal.close();
  }

  submitForm() {
    if (!this.emailForm.valid) {
      return;
    }

    this.sending = true;
    const { coverLetterId, ...emailFormValues } = this.emailForm.value;

    this.subscriptions.add(
      this.coverLetterService.sendEmail(coverLetterId, emailFormValues).subscribe({
        next: () => {
          this.notificationService.create(
            'success',
            'Send Cover Letter',
            `Cover letter successfully sent to "${emailFormValues.emailTo}"`
          );

          this.modal.destroy();
        },
        error: () => {
          this.notificationService.create(
            'error',
            'Send Cover Letter',
            `Uh-oh! Something wrong has happened. Unable to send email to "${emailFormValues.emailTo}"`
          );
        },
        complete: () => (this.sending = false),
      })
    );
  }

  get sendButtonText() {
    return this.sending ? 'Sending' : 'Send';
  }
}
