import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { PaginatedResult } from '@lib/pagination';
import { toSnakeCase, toCamelCase } from '@lib/util';
import { CoverLetter } from '@core/models';

@Injectable()
export class CoverLetterApiService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number): Observable<PaginatedResult<CoverLetter>> {
    const params = new HttpParams().append('page', `${pageIndex}`);

    return this.http.get<PaginatedResult<CoverLetter>>('/api/cover_letters.json', { params });
  }

  create(coverLetter: CoverLetter): Observable<CoverLetter> {
    const snakeCoverLetter = toSnakeCase({ coverLetter });

    return this.http
      .post<any>('/api/cover_letters.json', snakeCoverLetter)
      .pipe(map((result) => toCamelCase<CoverLetter>(result)));
  }

  update(coverLetter: CoverLetter): Observable<CoverLetter> {
    const snakeCoverLetter = toSnakeCase({ coverLetter });

    return this.http
      .put<any>(`/api/cover_letters/${coverLetter.id}.json`, snakeCoverLetter)
      .pipe(map((result) => toCamelCase<CoverLetter>(result)));
  }

  sendEmail(coverLetterId: number, emailForm: any): Observable<any> {
    const snakeEmailForm = toSnakeCase(emailForm);
    const formData = new FormData();

    for (const key of Object.keys(snakeEmailForm)) {
      const value = snakeEmailForm[key];
      formData.append(`cover_letter_email_form[${key}]`, value);
    }

    return this.http.post<any>(`/api/cover_letters/${coverLetterId}/send_email.json`, formData);
  }

  findById(coverLetterId: number): Observable<CoverLetter> {
    return this.http.get<CoverLetter>(`/api/cover_letters/${coverLetterId}.json`);
  }

  delete(coverLetterId: number): Observable<any> {
    return this.http.delete(`/api/cover_letters/${coverLetterId}.json`);
  }
}
