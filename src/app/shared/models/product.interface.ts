export interface IStoreProductData {
  id: number;
  name: string;
}
export interface IMostPopularProduct {
  name: string | null | undefined;
  amount: number | null;
}
export interface IWidgetProductData {
  id: number;
  amount: number;
}

export type IProductsMap = Map<number, string>;

export type IStoreProductListResponse = IStoreProductData[];
