import { IMostPopularProduct, IProductStore } from './product.interface';

export interface IStore {
  name: string;
  products: IProductStore[];
}

export interface ISharedStore extends IStore {
  name: string;
  products: IProductStore[];
  mostPopularProduct: IMostPopularProduct;
  totalAmountProducts: number;
}
