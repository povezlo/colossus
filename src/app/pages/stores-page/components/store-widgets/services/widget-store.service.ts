import { Injectable } from '@angular/core';
import { ProductsFormArray, IStore, IProductStore, IProductsMap } from '@shared/models';

@Injectable({ providedIn: 'root' })
export class WidgetStoreService {
  transformFormValueToNewStore(products: ProductsFormArray[], storeName: string, map: IProductsMap): IStore {
    const updateProducts = products.map((product: ProductsFormArray) => ({
      amount: Number(product.amount),
      id: this.getKeyByMap(map, product.productSelected),
    })) as IProductStore[];

    return {
      name: storeName,
      products: updateProducts.filter(product => product.id),
    };
  }

  private getKeyByMap(map: Map<number, string>, value: string) {
    for (const [key, val] of map) {
      if (val === value) {
        return key;
      }
    }
    return null;
  }
}
