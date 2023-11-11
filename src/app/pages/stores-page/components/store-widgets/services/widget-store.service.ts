import { Injectable, inject } from '@angular/core';
import {
  IProductsFormArray,
  IStoreData,
  IWidgetProductData,
  IProductsMap,
  IStoreFormValue,
  ProductsService,
} from '@shared/models';

@Injectable({ providedIn: 'root' })
export class WidgetStoreService {
  private productMap: IProductsMap = inject(ProductsService).cacheProducts;

  transformFormValueToNewStoreData(formValue: IStoreFormValue): IStoreData {
    const { storeName, products } = formValue;
    const updatedProducts = products ? this.getUpdatedProducts(products, this.productMap) : [];

    return {
      name: storeName,
      products: updatedProducts,
    };
  }

  private getUpdatedProducts(products: IProductsFormArray[], map: IProductsMap): IWidgetProductData[] {
    return products
      .map((product: IProductsFormArray) => ({
        amount: Number(product.amount),
        id: this.getKeyByMap(map, product.productSelected),
      }))
      .filter(product => product.id) as IWidgetProductData[];
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
