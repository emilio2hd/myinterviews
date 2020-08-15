import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { NzNotificationService } from 'ng-zorro-antd/notification';

import { CoverLetterService } from '../cover-letter.service';
import { CoverLetter } from '../cover-letter';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class CoverLetterFormComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  coverLetterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private coverLetterService: CoverLetterService,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.coverLetterForm = this.fb.group({
      title: ['', [Validators.required]],
      content: [null, [Validators.required]],
    });
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
    if (!this.coverLetterForm.valid) {
      return;
    }

    const coverLetter = this.coverLetterForm.value as CoverLetter;

    this.subscriptions.add(
      this.coverLetterService.create(coverLetter).subscribe({
        next: () => {
          this.createNotification('success', `"${coverLetter.title}" successfully created`);
          this.router.navigate(['..'], { relativeTo: this.route });
        },
        error: () => {
          this.createNotification(
            'error',
            `Uh-oh! Something wrong has happened. Unable to save "${coverLetter.title}"`
          );
        },
      })
    );
  }

  private createNotification(type: 'success' | 'error', message: string) {
    this.notificationService.create(type, 'Cover Letter', message);
  }
}
