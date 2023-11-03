import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NotificationService } from '../services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  notification = inject(NotificationService);

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.notification.showError(`Error: ${error.name}: ${error.status}`);
        return throwError(() => error.message);
      })
    );
  }
}
