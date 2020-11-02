import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { Subscription, pipe, combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { NzNotificationService } from 'ng-zorro-antd/notification';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as _ from 'lodash';

import { SettingsService } from '@core/services';

import { CoverLetterService } from '../cover-letter.service';
import { CoverLetter } from '../cover-letter';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss'],
})
export class SendEmailComponent implements OnInit, OnDestroy {
  private getCoverLetterFromRouterData = pipe(
    map((routerData: Data) => (routerData.coverLetter || {}) as CoverLetter)
  );

  private subscriptions = new Subscription();
  emailForm: FormGroup;
  Editor = ClassicEditor;

  coverLetter$ = this.getCoverLetterFromRouterData(this.route.data);
  hasNoSettings$ = this.settingsService.get().pipe(
    map((settings) => {
      const isSettingEmpty = _.chain(settings).omitBy(_.isNull).isEmpty().value();
      return isSettingEmpty;
    }),
    shareReplay(1)
  );

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private coverLetterService: CoverLetterService,
    private settingsService: SettingsService,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      coverLetterId: [''],
      emailTo: ['asd@gmail.com', [Validators.required, Validators.email]],
      subject: ['hey', [Validators.required]],
      attachment: [''],
      message: ['', [Validators.required]],
      hasSettings: [], // hidden value just to disable the form if has no settings
    });

    this.subscriptions.add(
      combineLatest([this.hasNoSettings$, this.coverLetter$]).subscribe(
        ([hasNoSettings, coverLetter]) => {
          if (hasNoSettings) {
            this.emailForm.get('hasSettings').setErrors({ incorrect: true });
          }

          this.emailForm.get('coverLetterId').setValue(coverLetter.id);
          this.emailForm.get('message').setValue(coverLetter.content);
        }
      )
    );
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  onBack() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  submitForm() {
    if (!this.emailForm.valid) {
      return;
    }

    const { coverLetterId, ...emailFormValues } = this.emailForm.value;

    this.subscriptions.add(
      this.coverLetterService.sendEmail(coverLetterId, emailFormValues).subscribe({
        next: () => {
          this.notificationService.create(
            'success',
            'Send Cover Letter',
            `Cover letter successfully sent to "${emailFormValues.emailTo}"`
          );
          this.router.navigate(['..'], { relativeTo: this.route });
        },
        error: () => {
          this.notificationService.create(
            'error',
            'Send Cover Letter',
            `Uh-oh! Something wrong has happened. Unable to send email to "${emailFormValues.emailTo}"`
          );
        },
      })
    );
  }
}
