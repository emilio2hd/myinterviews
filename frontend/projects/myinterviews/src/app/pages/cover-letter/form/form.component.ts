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
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class CoverLetterFormComponent implements OnInit, OnDestroy {
  private getCoverLetterFromRouterData = pipe(
    map((routerData: Data) => (routerData.coverLetter || {}) as CoverLetter)
  );
  private subscriptions = new Subscription();
  coverLetterForm: FormGroup;
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
    this.coverLetterForm = this.fb.group({
      id: [''],
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
    });

    this.subscriptions.add(
      this.coverLetter$.subscribe((coverLetter) => this.coverLetterForm.patchValue(coverLetter))
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
        this.router.navigate(['..'], { relativeTo: this.route });
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
