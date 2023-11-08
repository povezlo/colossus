import { Route } from '@angular/router';
import { productResolver } from '@core/resolvers';

export const routes: Route[] = [
  {
    path: 'home',
    title: 'Home',
    loadChildren: () => import('./pages/home-page/home-page-routes').then(m => m.routes),
  },
  {
    path: 'stores',
    title: 'Store',
    resolve: { productMap: productResolver },
    loadChildren: () => import('./pages/stores-page/stores-page-routes').then(m => m.routes),
  },
  {
    path: 'error',
    title: 'Error Page',
    loadComponent: () => import('./pages/error-page/error-page.component').then(m => m.ErrorPageComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '**',
    redirectTo: 'error',
  },
];
