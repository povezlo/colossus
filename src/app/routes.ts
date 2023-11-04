import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'stores',
  },
  {
    path: 'home',
    title: 'Home',
    loadChildren: () => import('./pages/home-page/home-page-routes').then(m => m.routes),
  },
  {
    path: 'stores',
    title: 'Store',
    loadChildren: () => import('./pages/stores-page/stores-page-routes').then(m => m.routes),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
