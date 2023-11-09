import { Routes } from '@angular/router';
import { StoresPageComponent } from './stores-page.component';
import { RoutePath } from 'src/app/shared/models';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'widget',
  },
  {
    path: RoutePath.WIDGET,
    component: StoresPageComponent,
    children: [
      {
        path: '',
        outlet: 'widget',
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: RoutePath.CREATE_STORE,
          },
          {
            path: RoutePath.CREATE_STORE,
            loadComponent: () =>
              import('./components/store-widgets/create-store-widget/create-store-widget.component').then(
                c => c.CreateStoreWidgetComponent
              ),
          },
          {
            path: RoutePath.EDIT_STORE_By_Id,
            loadComponent: () =>
              import('./components/store-widgets/edit-store-widget/edit-store-widget.component').then(
                c => c.EditStoreWidgetComponent
              ),
          },
        ],
      },
    ],
  },
];
