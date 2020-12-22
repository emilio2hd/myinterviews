import { Component, Input, OnInit } from '@angular/core';

import * as moment from 'moment';

import { JobApplication } from '../job-application.model';

@Component({
  selector: 'app-application-timeline',
  templateUrl: './application-timeline.component.html',
  styleUrls: ['./application-timeline.component.scss'],
})
export class ApplicationTimelineComponent implements OnInit {
  private interviewTypeMap = {
    talk: 'comment',
    technical: 'laptop',
  };

  @Input() jobApplication: JobApplication;

  constructor() {}

  ngOnInit(): void {}

  getPendingStatus(jobApplication: JobApplication) {
    return jobApplication?.interviews ? false : 'Waiting for interviews...';
  }

  formatDate(date: string) {
    return moment(date, 'YYYYMMDD').format('YYYY-MM-DD');
  }

  getInterviewIcon(type: string) {
    return this.interviewTypeMap[type];
  }
}
