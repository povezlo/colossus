import { importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import {
  provideClientHydration,
  BrowserModule,
  bootstrapApplication,
} from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';

export const routes: Route[] = [];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, RouterModule.forRoot(routes)),
    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
}).catch(err => console.error(err));
