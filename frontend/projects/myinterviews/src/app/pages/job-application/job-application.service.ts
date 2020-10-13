import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { PaginatedResult } from '@lib/pagination';
import { JobApplication } from '.';
import { toSnakeCase, toCamelCase } from '@lib/util';

@Injectable()
export class JobApplicationService {
  constructor(private http: HttpClient) {}

  getAll(pageIndex: number): Observable<PaginatedResult<JobApplication>> {
    const params = new HttpParams().append('page', `${pageIndex}`);

    return this.http.get<PaginatedResult<JobApplication>>('/api/my_applications.json', { params });
  }

  findById(jobApplicationId: number): Observable<JobApplication> {
    return this.http.get<JobApplication>(`/api/my_applications/${jobApplicationId}.json`);
  }

  create(jobApplication: JobApplication): Observable<JobApplication> {
    const snakeJobApplication = toSnakeCase({ myApplication: jobApplication });

    return this.http
      .post<any>('/api/my_applications.json', snakeJobApplication)
      .pipe(map((result) => toCamelCase<JobApplication>(result)));
  }

  update(jobApplication: JobApplication): Observable<JobApplication> {
    const snakeJobApplication = toSnakeCase({ myApplication: jobApplication });

    return this.http
      .put<any>(`/api/my_applications/${jobApplication.id}.json`, snakeJobApplication)
      .pipe(map((result) => toCamelCase<JobApplication>(result)));
  }

  delete(jobApplicationId: number): Observable<any> {
    return this.http.delete(`/api/my_applications/${jobApplicationId}.json`);
  }
}
