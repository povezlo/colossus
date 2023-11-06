import { inject } from '@angular/core';
import { Route } from '@angular/router';
import { ProductsService } from './shared/services';

export const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    title: 'Home',
    loadChildren: () => import('./pages/home-page/home-page-routes').then(m => m.routes),
  },
  {
    path: 'stores',
    title: 'Store',
    resolve: { productMap: () => inject(ProductsService).getProducts() },
    loadChildren: () => import('./pages/stores-page/stores-page-routes').then(m => m.routes),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
