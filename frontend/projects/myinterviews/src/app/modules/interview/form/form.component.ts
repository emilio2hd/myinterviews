import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { Subscription, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

import { NzNotificationService } from 'ng-zorro-antd/notification';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { InterviewApiService } from '../interview.api.service';
import { Interview, JobApplication } from '../interview.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class InterviewFormComponent implements OnInit, OnDestroy {
  private getInterviewFromRouterData = pipe(
    map((routerData: Data) => (routerData.interview || {}) as Interview)
  );
  private getApplicationsFromRouteData = pipe(
    map((routerData: Data) => (routerData.applications || []) as JobApplication[])
  );
  private subscriptions = new Subscription();

  interviewForm: FormGroup;
  Editor = ClassicEditor;

  interview$ = this.getInterviewFromRouterData(this.route.data);
  applications$ = this.getApplicationsFromRouteData(this.route.data);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private interviewService: InterviewApiService,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.interviewForm = this.fb.group({
      id: [''],
      myApplicationId: [''],
      interviewerName: ['', [Validators.required]],
      interviewerEmail: ['', [Validators.email]],
      typeOf: [''],
      at: [''],
      feedback: [''],
      notes: [''],
    });

    this.subscriptions.add(
      this.interview$.subscribe((interview) => this.interviewForm.patchValue(interview))
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
    if (!this.interviewForm.valid) {
      return;
    }

    const interview = this.interviewForm.value as Interview;

    if (interview.id) {
      this.subscriptions.add(
        this.interviewService.update(interview).subscribe(this.getCallbacks(interview, 'updated'))
      );
    } else {
      this.subscriptions.add(
        this.interviewService.create(interview).subscribe(this.getCallbacks(interview, 'created'))
      );
    }
  }

  getApplicationLabel(application: JobApplication) {
    return `${application.position} - ${application.company}`;
  }

  private getCallbacks(interview: Interview, action: string) {
    return {
      next: () => {
        this.createNotification(
          'success',
          `Interview with "${interview.interviewerName}" successfully ${action}`
        );
        this.router.navigate(['..'], { relativeTo: this.route });
      },
      error: () => {
        this.createNotification(
          'error',
          `Uh-oh! Something wrong has happened. Unable to save "interview with ${interview.interviewerName}"`
        );
      },
    };
  }

  private createNotification(type: 'success' | 'error', message: string) {
    this.notificationService.create(type, 'Interview', message);
  }
}
