import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { PaginatedResult } from '@lib/pagination';
import { toSnakeCase, toCamelCase } from '@lib/util';
import { Entity } from '@core/models';

export abstract class ApiService<T extends Entity> {
  abstract baseUrl: string;

  protected apiUrl = (urlBit = '') => `${this.baseUrl}${urlBit}`;

  constructor(protected http: HttpClient) {}

  getPaginatedResults(pageIndex: number): Observable<PaginatedResult<T>> {
    const params = new HttpParams().append('page', `${pageIndex}`);

    return this.http.get<PaginatedResult<T>>(this.apiUrl(), { params });
  }

  save(entity: T): Observable<T> {
    if (entity.id) {
      return this.update(entity);
    }

    return this.create(entity);
  }

  create(entity: T): Observable<T> {
    const sneakedEntity = toSnakeCase(this.beforeSendRequest(entity));

    return this.http
      .post<any>(this.apiUrl(), sneakedEntity)
      .pipe(map((result) => toCamelCase<T>(result)));
  }

  update(entity: T): Observable<T> {
    const sneakedEntity = toSnakeCase(this.beforeSendRequest(entity));

    return this.http
      .put<any>(this.apiUrl(`/${entity.id}`), sneakedEntity)
      .pipe(map((result) => toCamelCase<T>(result)));
  }

  findById(enityId: number): Observable<T> {
    return this.http.get<T>(this.apiUrl(`/${enityId}`));
  }

  delete(enityId: number): Observable<any> {
    return this.http.delete(this.apiUrl(`/${enityId}`));
  }

  protected beforeSendRequest(entity: T): any {
    return entity;
  }
}
