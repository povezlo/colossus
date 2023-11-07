import { importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideClientHydration, BrowserModule, bootstrapApplication } from '@angular/platform-browser';

import { provideToastr } from 'ngx-toastr';

import { provideBaseUrl, ErrorInterceptor, provideInitializeApp } from './app/core';
import { environment } from './environments/environment.prod';
import { routes } from './app/routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, BrowserAnimationsModule),
    provideRouter(routes, withComponentInputBinding(), withPreloading(PreloadAllModules)),
    provideClientHydration(),
    provideHttpClient(withInterceptors([ErrorInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideBaseUrl(environment.baseURL),
    provideInitializeApp(),
    provideAnimations(),
    provideToastr(),
  ],
}).catch(err => console.error(err));
