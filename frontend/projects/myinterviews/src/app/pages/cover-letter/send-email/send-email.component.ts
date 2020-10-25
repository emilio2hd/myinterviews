import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { Subscription, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

import { NzNotificationService } from 'ng-zorro-antd/notification';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
  public Editor = ClassicEditor;

  coverLetter$ = this.getCoverLetterFromRouterData(this.route.data);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private coverLetterService: CoverLetterService,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      coverLetterId: [''],
      emailTo: ['asd@gmail.com', [Validators.required, Validators.email]],
      subject: ['hey', [Validators.required]],
      attachment: [''],
      message: ['', [Validators.required]],
    });

    this.subscriptions.add(
      this.coverLetter$.subscribe((coverLetter) => {
        this.emailForm.get('coverLetterId').setValue(coverLetter.id);
        this.emailForm.get('message').setValue(coverLetter.content);
      })
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
