import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from '@core/services';
import { Interview, Application } from './interview.model';

@Injectable({
  providedIn: 'root',
})
export class InterviewService extends ApiService<Interview> {
  baseUrl = '/api/interviews';

  constructor(protected http: HttpClient) {
    super(http);
  }

  getAllPosition(): Observable<Application[]> {
    return this.http
      .get<{ data: Application[] }>('/api/my_applications.json')
      .pipe(map((result) => result.data));
  }

  protected beforeSendRequest(interview: Interview): any {
    return { interview: super.beforeSendRequest(interview) };
  }
}
