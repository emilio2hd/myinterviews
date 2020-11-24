import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { InterviewApiService } from './interview.api.service';
import { JobApplication } from './interview.model';

@Injectable()
export class ApplicationsResolver implements Resolve<JobApplication[]> {
  constructor(private interviewService: InterviewApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<JobApplication[]> {
    return this.interviewService.getAllPosition().pipe(catchError((error) => of([])));
  }
}
