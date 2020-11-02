import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { HttpResponseConverterInterceptor, HttpErrorsInterceptor } from './interceptors';
import { SettingsService } from './services';

@NgModule({
  imports: [HttpClientModule],
  exports: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpResponseConverterInterceptor, multi: true }, // Keep this one as the first one
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorsInterceptor, multi: true },
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
