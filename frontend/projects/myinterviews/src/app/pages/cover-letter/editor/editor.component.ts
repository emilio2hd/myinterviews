import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { Subscription, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

import { NzNotificationService } from 'ng-zorro-antd/notification';

import { CoverLetterService } from '../cover-letter.service';
import { CoverLetter } from '../cover-letter';

@Component({
  selector: 'app-cover-letter-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class CoverLetterEditorComponent implements OnInit, OnDestroy {
  private getCoverLetterFromRouterData = pipe(
    map((routerData: Data) => (routerData.coverLetter || {}) as CoverLetter)
  );
  private subscriptions = new Subscription();

  coverLetter$ = this.getCoverLetterFromRouterData(this.route.data);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coverLetterService: CoverLetterService,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  getHeader(coverLetter: CoverLetter) {
    return coverLetter.id ? 'Edit' : 'New';
  }

  onBack() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  onFormSubmit(coverLetter: CoverLetter) {
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
