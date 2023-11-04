import { HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services';
import { LoaderService, SharedLoaderState } from '../components/shared-loader';

export function ErrorInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  const notification = inject(NotificationService);
  const loader = inject(LoaderService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      notification.showError(`Error: ${error.name}: ${error.status}`);
      loader.loaderStateSource$.next(SharedLoaderState.error);
      return throwError(() => error.message);
    })
  );
}
