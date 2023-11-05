import { Injectable, inject } from '@angular/core';
import { Observable, map, of, shareReplay } from 'rxjs';
import { IProduct, IProductStore, IProductsMap } from '@shared/models';
import { ApiClientBaseService } from '@shared/services/api';

const ROUTE_PRODUCTS = 'products';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  cacheProducts: IProductsMap = new Map();

  private readonly http = inject(ApiClientBaseService);

  getProducts(): Observable<IProductsMap> {
    if (this.cacheProducts.size) {
      return of(this.cacheProducts);
    } else {
      return this.http.get<IProduct[]>(ROUTE_PRODUCTS).pipe(
        shareReplay(1),
        map((response: IProduct[]) => {
          this.cacheProducts = this.transformToMap(response);
          return this.cacheProducts;
        })
      );
    }
  }

  findMostPopularyProducts(productsList: IProductStore[]): IProductStore | null {
    if (!productsList || productsList.length === 0) {
      return null;
    }

    return productsList.reduce((minAmountProduct, currentProduct) => {
      return currentProduct.amount < minAmountProduct.amount ? currentProduct : minAmountProduct;
    }, productsList[0]);
  }

  private transformToMap(product: IProduct[]): IProductsMap {
    const map = new Map();

    product.forEach(item => {
      map.set(item.id, item.name);
    });

    return map;
  }
}
