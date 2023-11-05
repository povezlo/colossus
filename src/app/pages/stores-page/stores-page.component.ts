import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, TrackByFunction, inject } from '@angular/core';

import { Observable, map, switchMap, tap } from 'rxjs';

import {
  ISharedStore,
  LoaderComponent,
  LoaderService,
  LoaderState,
  ProductsService,
} from '@shared/components';
import { ApiStoresService } from '@shared/services';
import { NewStoreWidgetComponent, StoreComponent, StoreListComponent } from './components';

@Component({
  selector: 'app-stores',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf,
    LoaderComponent,
    StoreComponent,
    StoreListComponent,
    NewStoreWidgetComponent,
  ],
  templateUrl: './stores-page.component.html',
  styleUrls: ['./stores-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoresPageComponent implements OnInit {
  stores$: Observable<ISharedStore[]> | null = null;

  private storesService = inject(ApiStoresService);
  private productsService = inject(ProductsService);
  private loader = inject(LoaderService);

  trackByFn: TrackByFunction<ISharedStore> = (index, _) => index;

  ngOnInit(): void {
    this.InitStores();
  }

  InitStores(): void {
    this.loader.loaderStateSource$.next(LoaderState.loading);

    this.stores$ = this.storesService.getStores().pipe(
      switchMap(stores => {
        return this.productsService.getProducts().pipe(
          map(productMap => {
            return this.productsService
              .transformStore(stores, productMap)
              .sort((a, b) => b.totalAmountProducts - a.totalAmountProducts);
          })
        );
      }),
      tap(stores => {
        if (!stores.length) {
          this.loader.loaderStateSource$.next(LoaderState.noData);
          return;
        }

        this.loader.loaderStateSource$.next(LoaderState.loaded);
      })
    );
  }
}
