import { Route } from '@angular/router';
import { productResolver } from '@core/resolvers';
import { RoutePath } from '@shared/models';

export const routes: Route[] = [
  {
    path: RoutePath.HOME,
    title: 'Home',
    loadChildren: () => import('./pages/home-page/home-page-routes').then(m => m.routes),
  },
  {
    path: RoutePath.STORES,
    title: 'Store',
    resolve: { productMap: productResolver },
    loadChildren: () => import('./pages/stores-page/stores-page-routes').then(m => m.routes),
  },
  {
    path: RoutePath.ERROR,
    title: 'Error Page',
    loadComponent: () => import('./pages/error-page/error-page.component').then(m => m.ErrorPageComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: RoutePath.HOME,
  },
  {
    path: '**',
    redirectTo: RoutePath.ERROR,
  },
];
