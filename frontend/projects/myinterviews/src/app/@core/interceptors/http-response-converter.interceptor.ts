import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { toCamelCase } from '@lib/util';

/**
 * Convert response body to `camelCase`, when is GET request.
 * It should add this as the first interceptor.
 */
@Injectable()
export class HttpResponseConverterInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method === 'GET' && !request.headers.has('x-keep-original-body')) {
      return next.handle(request).pipe(
        map((event) => {
          if (event instanceof HttpResponse) {
            event = event.clone({ body: toCamelCase(event.body) });
          }

          return event;
        })
      );
    }

    return next.handle(request);
  }
}
