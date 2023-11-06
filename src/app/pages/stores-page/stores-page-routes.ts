import { Routes } from '@angular/router';
import { StoresPageComponent } from './stores-page.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'widget',
  },
  {
    path: 'widget',
    component: StoresPageComponent,
    children: [
      {
        path: '',
        outlet: 'widget',
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'create',
          },
          {
            path: 'create',
            loadComponent: () =>
              import(
                './components/store-widgets/create-store-widget/create-store-widget.component'
              ).then(c => c.CreateStoreWidgetComponent),
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import(
                './components/store-widgets/edit-store-widget/edit-store-widget.component'
              ).then(c => c.EditStoreWidgetComponent),
          },
        ],
      },
    ],
  },
];
