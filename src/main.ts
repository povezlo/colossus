import { importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withDebugTracing,
  withPreloading,
} from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import {
  provideClientHydration,
  BrowserModule,
  bootstrapApplication,
} from '@angular/platform-browser';

import { provideToastr } from 'ngx-toastr';

import { BASE_URL } from './app/shared';
import { ErrorInterceptor } from './app/shared/interceptors';
import { environment } from './environments/environment.prod';
import { routes } from './app/routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, BrowserAnimationsModule),
    provideRouter(routes, withPreloading(PreloadAllModules), withDebugTracing()),
    provideClientHydration(),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideToastr(),
    {
      provide: BASE_URL,
      useValue: environment.baseURL,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
}).catch(err => console.error(err));
