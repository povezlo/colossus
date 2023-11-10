import { Injectable, inject } from '@angular/core';
import { Observable, map, of, shareReplay } from 'rxjs';
import {
  IWidgetProductData,
  IProductsMap,
  ISharedStoreData,
  IStoreData,
  Pathname,
  IStoreProductListResponse,
} from '@shared/models';
import { ApiClientBaseService } from '@shared/services/api';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private _cacheProducts: IProductsMap = new Map();

  private readonly http = inject(ApiClientBaseService);

  get cacheProducts(): IProductsMap {
    return this._cacheProducts;
  }

  set cacheProducts(map: IProductsMap) {
    this._cacheProducts = map;
  }

  getProducts(): Observable<IProductsMap> {
    if (this.cacheProducts.size) {
      return of(this.cacheProducts);
    } else {
      return this.http.get<IStoreProductListResponse>(Pathname.ROUTE_PRODUCTS).pipe(
        shareReplay(1),
        map((response): IProductsMap => {
          this.cacheProducts = this.transformToMap(response);
          return this.cacheProducts;
        })
      );
    }
  }

  sharedStoreData(stores: IStoreData[], productMap: IProductsMap): ISharedStoreData[] {
    return stores.map(store => {
      const product = this.getMostPopularyProducts(store.products);
      return {
        ...store,
        mostPopularProduct: {
          name: product ? productMap.get(product.id) : null,
          amount: product ? product.amount : null,
        },
        totalAmountProducts: this.getTotalAmountProduct(store.products),
      };
    });
  }

  private getMostPopularyProducts(productsList: IWidgetProductData[]): IWidgetProductData | null {
    if (!productsList || productsList.length === 0) {
      return null;
    }

    return productsList.reduce((minAmountProduct, currentProduct) => {
      return currentProduct.amount < minAmountProduct.amount ? currentProduct : minAmountProduct;
    }, productsList[0]);
  }

  private getTotalAmountProduct(products: IWidgetProductData[]): number {
    if (!products || products.length === 0) {
      return 0;
    }

    return products.reduce((total, product) => total + product.amount, 0);
  }

  private transformToMap(product: IStoreProductListResponse): IProductsMap {
    const map = new Map();

    product.forEach(item => {
      map.set(item.id, item.name);
    });

    return map;
  }
}
