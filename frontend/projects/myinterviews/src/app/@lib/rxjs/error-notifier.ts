import { ErrorNotification } from '@core/models';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Catch error and wraps it as ErrorNotification object
 * to be handled by the GlobalErrorHandler displaying a notification.
 *
 * @param title - Notification title
 * @param message - Notification message
 */
export const errorNotifier = <T>(title: string, message: string) => {
  return (source: Observable<T>): Observable<T> => {
    return source.pipe(
      catchError((error) => throwError(new ErrorNotification(title, message, error)))
    );
  };
};
