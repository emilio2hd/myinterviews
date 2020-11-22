import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ErrorNotification } from './models/error-notification';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: ErrorNotification | Error | HttpErrorResponse) {
    const notifier = this.injector.get(NzNotificationService);
    let errorToLog = error;

    if (error instanceof ErrorNotification) {
      // Custom error message
      notifier.error(error.title, error.message);
      console.error(error.error);
    } else if (error instanceof HttpErrorResponse) {
      // Server Error
      notifier.error('Server error', 'Some error occured on the server side');

      let errorMessage = '';
      errorToLog = error.error;
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }

      console.error(errorMessage);
      console.error('source: ', error.error);
    } else {
      // Client Error
      notifier.error('Application Error', 'The application has behaved unexpectedly');
      console.error(error);
    }
  }
}
