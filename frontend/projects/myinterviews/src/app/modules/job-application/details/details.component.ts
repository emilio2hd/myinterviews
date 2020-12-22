import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { pluck } from 'rxjs/operators';

import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import * as moment from 'moment';

import {
  JobApplication,
  JobApplicationStatusEnum,
  JobApplicationStatusMapping,
} from '../job-application.model';
import { JobApplicationApiService } from '../job-application.api.service';
import { ApplicationTimelineComponent } from '../application-timeline/application-timeline.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class JobApplicationDetailsComponent implements OnInit {
  jobApplication$ = this.route.data.pipe(pluck<Data, JobApplication>('jobApplication'));

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobApplicationService: JobApplicationApiService,
    private notificationService: NzNotificationService,
    private drawerService: NzDrawerService
  ) {}

  ngOnInit(): void {}

  onConfirmDelete(jobApplication: JobApplication) {
    this.jobApplicationService.delete(jobApplication.id).subscribe({
      next: () => {
        this.notificationService.success(
          'Job Application',
          `"${jobApplication.position}" successfully deleted`
        );
        this.goToRecipesList();
      },
      error: () =>
        this.notificationService.error(
          'Job Application',
          `Uh-oh! Something wrong has happened. Unable to save "${jobApplication.position}"`
        ),
    });
  }

  goToRecipesList() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  getStatusText(status: JobApplicationStatusEnum) {
    return JobApplicationStatusMapping[status];
  }

  openTimeline(jobApplication: JobApplication): void {
    this.drawerService.create<
      ApplicationTimelineComponent,
      { jobApplication: JobApplication },
      void
    >({
      nzTitle: 'Application Timeline',
      nzWidth: 600,
      nzContent: ApplicationTimelineComponent,
      nzContentParams: { jobApplication },
    });
  }

  getPendingStatus(jobApplication: JobApplication) {
    return jobApplication?.interviews ? false : 'Waiting for interviews...';
  }
}
