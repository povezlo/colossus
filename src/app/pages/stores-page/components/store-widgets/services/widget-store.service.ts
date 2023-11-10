import { Injectable } from '@angular/core';
import { IProductsFormArray, IStoreData, IWidgetProductData, IProductsMap, IStoreFormValue } from '@shared/models';

@Injectable({ providedIn: 'root' })
export class WidgetStoreService {
  transformFormValueToNewStoreData(formValue: IStoreFormValue, map: IProductsMap): IStoreData {
    const { storeName, products } = formValue;
    const updatedProducts = products ? this.getUpdatedProducts(products, map) : [];

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
