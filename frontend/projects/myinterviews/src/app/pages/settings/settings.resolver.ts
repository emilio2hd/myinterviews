import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Settings } from './settings';
import { SettingsService } from './settings.service';

@Injectable()
export class SettingsResolver implements Resolve<Settings> {
  constructor(private settingsService: SettingsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Settings> {
    return this.settingsService.get();
  }
}
