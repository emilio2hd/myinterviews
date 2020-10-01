import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { PaginatedResult } from '@lib/pagination';
import { CoverLetter } from '.';
import { toSnakeCase, toCamelCase } from '@lib/util';

@Injectable()
export class CoverLetterService {
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
      .post<any>(`/api/cover_letters/${coverLetter.id}.json`, snakeCoverLetter)
      .pipe(map((result) => toCamelCase<CoverLetter>(result)));
  }

  findById(coverLetterId: number): Observable<CoverLetter> {
    return this.http.get<CoverLetter>(`/api/cover_letters/${coverLetterId}.json`);
  }

  delete(coverLetterId: number): Observable<any> {
    return this.http.delete(`/api/cover_letters/${coverLetterId}.json`);
  }
}
