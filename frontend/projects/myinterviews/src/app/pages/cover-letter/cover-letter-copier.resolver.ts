import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, EMPTY, throwError } from 'rxjs';

import { CoverLetter } from './cover-letter';
import { CoverLetterService } from './cover-letter.service';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CoverLetterCopierResolver implements Resolve<CoverLetter> {
  constructor(private coverLetterService: CoverLetterService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<CoverLetter> {
    return this.coverLetterService.findById(parseInt(route.paramMap.get('id'), 10)).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 404) {
          this.router.navigateByUrl('/not-found');
          return EMPTY;
        }

        return throwError(error);
      }),
      map((coverLetter) => {
        const { id, ...duplicatedCoverLetter } = coverLetter;
        duplicatedCoverLetter.title = `[Copy] ${duplicatedCoverLetter.title}`;
        return duplicatedCoverLetter;
      })
    );
  }
}
