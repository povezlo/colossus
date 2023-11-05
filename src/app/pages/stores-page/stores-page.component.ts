import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

import { Observable, tap } from 'rxjs';

import { LoaderComponent, LoaderService, LoaderState, ProductsService } from '@shared/components';
import { ApiStoresService } from '@shared/services';
import { IStore } from '@shared/models';

@Component({
  selector: 'app-stores',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, LoaderComponent],
  templateUrl: './stores-page.component.html',
  styleUrls: ['./stores-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoresPageComponent implements OnInit {
  stores$: Observable<IStore[]> | null = null;

  private storesService = inject(ApiStoresService);
  private loader = inject(LoaderService);
  private products = inject(ProductsService);

  ngOnInit(): void {
    this.loader.loaderStateSource$.next(LoaderState.loading);
    this.stores$ = this.storesService.getStores().pipe(
      tap(res => {
        if (!res.length) {
          this.loader.loaderStateSource$.next(LoaderState.noData);
          return;
        }
        this.loader.loaderStateSource$.next(LoaderState.loaded);
      })
    );

    this.products.getProducts().subscribe(products => console.log(products));
  }
}
