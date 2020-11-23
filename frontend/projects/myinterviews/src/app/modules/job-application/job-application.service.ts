import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiService } from '@core/services';
import { JobApplication } from '.';

@Injectable()
export class JobApplicationService extends ApiService<JobApplication> {
  baseUrl = '/api/my_applications';

  constructor(protected http: HttpClient) {
    super(http);
  }

  protected beforeSendRequest(jobApplication: JobApplication): any {
    return { myApplication: super.beforeSendRequest(jobApplication) };
  }
}
