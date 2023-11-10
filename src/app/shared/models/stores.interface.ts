import { IMostPopularProduct, IWidgetProductData } from './product.interface';

export interface IStoreData {
  name: string;
  products: IWidgetProductData[];
}

export interface ISharedStoreData extends IStoreData {
  name: string;
  products: IWidgetProductData[];
  mostPopularProduct: IMostPopularProduct;
  totalAmountProducts: number;
}

export type IStoreListResponse = IStoreData[];
