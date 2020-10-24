import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { toSnakeCase, toCamelCase } from '@lib/util';
import { Settings } from './settings';

@Injectable()
export class SettingsService {
  constructor(private http: HttpClient) {}

  get(): Observable<Settings> {
    return this.http
      .get<{ email: Settings }>('/api/settings.json')
      .pipe(map((result) => result.email));
  }

  update(settings: Settings): Observable<Settings> {
    const snakeSettings = toSnakeCase({ setting: { email: settings } });

    console.log(snakeSettings);

    return this.http
      .patch<any>(`/api/settings/update_all.json`, snakeSettings)
      .pipe(map((result) => toCamelCase<Settings>(result)));
  }
}
