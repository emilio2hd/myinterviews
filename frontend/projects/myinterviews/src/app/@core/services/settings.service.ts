import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import * as _ from 'lodash';

import { toSnakeCase, toCamelCase } from '@lib/util';
import { Settings } from '../models';

@Injectable()
export class SettingsService {
  private settingsStore$ = new BehaviorSubject<Settings>({ valid: false } as Settings);
  currentSettings$ = this.settingsStore$.asObservable();

  constructor(private http: HttpClient) {}

  get(): Observable<Settings> {
    return this.http
      .get<{ email: Settings }>('/api/settings.json')
      .pipe(map((result) => result.email));
  }

  update(settings: Settings): Observable<Settings> {
    const snakeSettings = toSnakeCase({ setting: { email: settings } });

    return this.http.patch<any>(`/api/settings/update_all.json`, snakeSettings).pipe(
      map((result) => toCamelCase<Settings>(result)),
      tap(() => this.settingsStore$.next({ ...settings, valid: true }))
    );
  }

  load(): Promise<any> {
    return this.get()
      .pipe(
        tap((settings) => {
          const isEmpty = _.chain(settings).omitBy(_.isNull).isEmpty().value();
          this.settingsStore$.next({ ...settings, valid: !isEmpty });
        })
      )
      .toPromise();
  }
}
