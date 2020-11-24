import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { JobApplication } from './job-application.model';
import { JobApplicationApiService } from './job-application.api.service';

@Injectable()
export class JobApplicationResolver implements Resolve<JobApplication> {
  constructor(private jobApplicationService: JobApplicationApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<JobApplication> {
    return this.jobApplicationService.findById(parseInt(route.paramMap.get('id'), 10)).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 404) {
          this.router.navigateByUrl('/not-found');
          return EMPTY;
        }

        return throwError(error);
      })
    );
  }
}
