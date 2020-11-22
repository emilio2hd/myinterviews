import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { NzNotificationModule } from 'ng-zorro-antd/notification';

import { HttpResponseConverterInterceptor } from './interceptors';
import { SettingsService } from './services';
import { GlobalErrorHandler } from './global-error.handler';

@NgModule({
  imports: [HttpClientModule, NzNotificationModule],
  exports: [],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler }, // Keep this as the first one
    { provide: HTTP_INTERCEPTORS, useClass: HttpResponseConverterInterceptor, multi: true }, // Keep this one as the second one
    SettingsService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('Core is already loaded. Import it in the AppModule only');
    }
  }
}
