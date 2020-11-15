import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { InterviewService } from './interview.service';
import { Interview } from './interview.model';

@Injectable()
export class InterviewResolver implements Resolve<Interview> {
  constructor(private interviewService: InterviewService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Interview> {
    return this.interviewService.findById(parseInt(route.paramMap.get('id'), 10)).pipe(
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
