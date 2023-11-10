import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ChangeDetectionStrategy, Component, Input, OnInit, TrackByFunction, inject } from '@angular/core';

import { Observable, map, tap } from 'rxjs';

import { LoaderComponent, LoaderService, LoaderState } from '@shared/components';
import { ApiStoresService, ProductsService } from '@shared/services';
import { IProductsMap, ISharedStoreData } from '@shared/models';
import { fadeInAnimation } from '@shared/utils';
import { StoreComponent, StoreListComponent } from './components';

@Component({
  selector: 'app-stores',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgForOf, LoaderComponent, StoreComponent, StoreListComponent, RouterOutlet],
  templateUrl: './stores-page.component.html',
  styleUrls: ['./stores-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation],
})
export class StoresPageComponent implements OnInit {
  @Input() productMap: IProductsMap = new Map();
  stores$: Observable<ISharedStoreData[]> | null = null;

  private storesService = inject(ApiStoresService);
  private productsService = inject(ProductsService);
  private loader = inject(LoaderService);

  trackByFn: TrackByFunction<ISharedStoreData> = (index, _) => index;
  showAnimation: boolean[] = [true];

  ngOnInit(): void {
    this.InitStores();
  }

  InitStores(): void {
    this.stores$ = this.storesService.getStores().pipe(
      map(stores => {
        if (!stores.length) {
          this.loader.loaderStateSource$.next(LoaderState.noData);
          return [];
        }
        return this.productsService
          .sharedStoreData(stores, this.productMap)
          .sort((a, b) => b.totalAmountProducts - a.totalAmountProducts);
      }),
      tap(() => {
        this.loader.loaderStateSource$.next(LoaderState.loaded);
      })
    );
  }
}
