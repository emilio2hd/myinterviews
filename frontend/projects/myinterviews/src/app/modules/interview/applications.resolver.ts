import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { InterviewApiService } from './interview.api.service';
import { Application } from './interview.model';

@Injectable()
export class ApplicationsResolver implements Resolve<Application[]> {
  constructor(private interviewService: InterviewApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Application[]> {
    return this.interviewService.getAllPosition().pipe(catchError((error) => of([])));
  }
}
