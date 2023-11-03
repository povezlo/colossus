import { importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  provideClientHydration,
  BrowserModule,
  bootstrapApplication,
} from '@angular/platform-browser';

import { ToastrModule } from 'ngx-toastr';

import { BASE_URL } from './app/shared';
import { ErrorInterceptor } from './app/shared/interceptors';
import { environment } from './environments/environment.prod';
import { AppComponent } from './app/app.component';

export const routes: Route[] = [];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      ToastrModule.forRoot(),
      RouterModule.forRoot(routes)
    ),
    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),
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
