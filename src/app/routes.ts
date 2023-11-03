import { Route } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { StoresPageComponent } from './pages/stores-page/stores-page.component';

export const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    title: 'Home',
    component: HomePageComponent,
  },
  {
    path: 'stores',
    title: 'Stores',
    component: StoresPageComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
