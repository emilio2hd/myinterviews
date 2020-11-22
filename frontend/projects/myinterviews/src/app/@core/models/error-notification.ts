import { HttpErrorResponse } from '@angular/common/http';

/**
 * Custom error notification to be used when it needs to display
 * an error notification by the global error handler.
 */
export class ErrorNotification implements Error {
  name = 'CustomErrorNotification';

  constructor(
    public title: string,
    public message: string,
    public error: Error | HttpErrorResponse
  ) {}
}
