import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { Subscription, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

import { NzNotificationService } from 'ng-zorro-antd/notification';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { JobApplication, JobApplicationStatusMapping } from '../job-application';
import { JobApplicationService } from '../job-application.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class JobApplicationFormComponent implements OnInit, OnDestroy {
  private getJobApplicationFromRouterData = pipe(
    map((routerData: Data) => (routerData.jobApplication || {}) as JobApplication)
  );
  private subscriptions = new Subscription();
  jobApplicationForm: FormGroup;
  public Editor = ClassicEditor;

  jobApplication$ = this.getJobApplicationFromRouterData(this.route.data);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private jobApplicationService: JobApplicationService,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.jobApplicationForm = this.fb.group({
      id: [''],
      position: ['', [Validators.required]],
      company: ['', [Validators.required]],
      location: ['', [Validators.required]],
      beganAt: [''],
      status: [''],
      cvUrl: [''],
      techStackList: [[]],
      jobDescription: [''],
      coverLetter: [''],
      overallFeedback: [''],
    });

    this.subscriptions.add(
      this.jobApplication$.subscribe((jobApplication) =>
        this.jobApplicationForm.patchValue(jobApplication)
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
    if (!this.jobApplicationForm.valid) {
      return;
    }

    const jobApplication = this.jobApplicationForm.value as JobApplication;

    if (jobApplication.id) {
      this.subscriptions.add(
        this.jobApplicationService
          .update(jobApplication)
          .subscribe(this.getCallbacks(jobApplication, 'updated'))
      );
    } else {
      this.subscriptions.add(
        this.jobApplicationService
          .create(jobApplication)
          .subscribe(this.getCallbacks(jobApplication, 'created'))
      );
    }
  }

  private createNotification(type: 'success' | 'error', message: string) {
    this.notificationService.create(type, 'Job Application', message);
  }

  private getCallbacks(coverLetter: JobApplication, action: string) {
    return {
      next: () => {
        this.createNotification('success', `"${coverLetter.position}" successfully ${action}`);
        this.router.navigate(['..'], { relativeTo: this.route });
      },
      error: () => {
        this.createNotification(
          'error',
          `Uh-oh! Something wrong has happened. Unable to save "${coverLetter.position}"`
        );
      },
    };
  }

  getStatusList() {
    return Object.keys(JobApplicationStatusMapping).map((key) => ({
      value: key,
      label: JobApplicationStatusMapping[key],
    }));
  }
}
