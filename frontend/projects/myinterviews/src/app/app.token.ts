import { inject, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { Settings } from '@core/models';
import { SettingsService } from '@core/services';

export const APP_SETTINGS = new InjectionToken<Observable<Settings>>(
  'Settings from currentSettings in SettingsServices',
  {
    providedIn: 'root',
    factory: () => inject(SettingsService).currentSettings$,
  }
);
