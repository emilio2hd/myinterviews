import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import {
  JobApplication,
  JobApplicationStatusEnum,
  JobApplicationStatusMapping,
} from '../job-application.model';
import { JobApplicationApiService } from '../job-application.api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class JobApplicationDetailsComponent implements OnInit {
  private interviewTypeMap = {
    talk: 'comment',
    technical: 'laptop',
  };
  private getJobApplicationFromRouterData = pipe(
    map((routerData: Data) => routerData.jobApplication as JobApplication)
  );
  jobApplication$ = this.getJobApplicationFromRouterData(this.route.data);

  visible = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobApplicationService: JobApplicationApiService,
    private notificationService: NzNotificationService
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

  formatDate(date: string) {
    return moment(date, 'YYYYMMDD').format('YYYY-MM-DD');
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  getInterviewIcon(type: string) {
    return this.interviewTypeMap[type];
  }

  getPendingStatus(jobApplication: JobApplication) {
    return jobApplication?.interviews ? false : 'Waiting for interviews...';
  }
}
