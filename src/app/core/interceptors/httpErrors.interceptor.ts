import { HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '@shared/services';
import { LoaderService, LoaderState } from '@shared/components';

export function ErrorInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  const notification = inject(NotificationService);
  const loader = inject(LoaderService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      notification.showError(`Error: ${error.name}: ${error.status}`);
      loader.loaderStateSource$.next(LoaderState.error);
      return throwError(() => error.message);
    })
  );
}
