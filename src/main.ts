import { importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import {
  provideClientHydration,
  BrowserModule,
  bootstrapApplication,
} from '@angular/platform-browser';

import { provideToastr } from 'ngx-toastr';

import { BASE_URL } from './app/shared';
import { environment } from './environments/environment.prod';
import { routes } from './app/routes';
import { AppComponent } from './app/app.component';
import { ErrorInterceptor } from './app/shared/interceptors';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, BrowserAnimationsModule),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideClientHydration(),
    provideHttpClient(withInterceptors([ErrorInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideToastr(),
    {
      provide: BASE_URL,
      useValue: environment.baseURL,
    },
  ],
}).catch(err => console.error(err));
