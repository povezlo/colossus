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
            path: 'create',
            loadComponent: () =>
              import(
                './components/store-widgets/create-store-widget/create-store-widget.component'
              ).then(c => c.CreateStoreWidgetComponent),
          },
          {
            path: 'delete',
            loadComponent: () =>
              import(
                './/components/store-widgets/delete-store-widget/delete-store-widget.component'
              ).then(c => c.DeleteStoreWidgetComponent),
          },
        ],
      },
    ],
  },
];
