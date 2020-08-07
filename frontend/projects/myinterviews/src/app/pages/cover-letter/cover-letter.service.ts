import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { toCamelCase } from '@lib/util';
import { PaginatedResult } from '@lib/pagination';
import { CoverLetter } from '.';

@Injectable()
export class CoverLetterService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number): Observable<PaginatedResult<CoverLetter>> {
    const params = new HttpParams().append('page', `${pageIndex}`);

    return this.http
      .get<any>('/api/cover_letters.json', { params })
      .pipe(
        map((payload) => toCamelCase(payload) as PaginatedResult<CoverLetter>),
        catchError((error) => this.handleError(error))
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
