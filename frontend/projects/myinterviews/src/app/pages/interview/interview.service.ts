import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { PaginatedResult } from '@lib/pagination';
import { toSnakeCase, toCamelCase } from '@lib/util';
import { Interview, Application } from './interview.model';

@Injectable({
  providedIn: 'root',
})
export class InterviewService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number): Observable<PaginatedResult<Interview>> {
    const params = new HttpParams().append('page', `${pageIndex}`);

    return this.http.get<PaginatedResult<Interview>>('/api/interviews.json', { params });
  }

  getAllPosition(): Observable<Application[]> {
    return this.http
      .get<{ data: Application[] }>('/api/my_applications.json')
      .pipe(map((result) => result.data));
  }

  create(interview: Interview): Observable<Interview> {
    const snakeinterview = toSnakeCase({ interview });

    return this.http
      .post<any>('/api/interviews.json', snakeinterview)
      .pipe(map((result) => toCamelCase<Interview>(result)));
  }

  update(interview: Interview): Observable<Interview> {
    const snakeinterview = toSnakeCase({ interview });

    return this.http
      .put<any>(`/api/interviews/${interview.id}.json`, snakeinterview)
      .pipe(map((result) => toCamelCase<Interview>(result)));
  }

  findById(interviewId: number): Observable<Interview> {
    return this.http.get<Interview>(`/api/interviews/${interviewId}.json`);
  }

  delete(interviewId: number): Observable<any> {
    return this.http.delete(`/api/interviews/${interviewId}.json`);
  }
}
