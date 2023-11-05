export interface IProduct {
  id: number;
  name: string;
}
export interface IMostPopularProduct {
  name: string | null | undefined;
  amount: number | null;
}
export interface IProductStore {
  id: number;
  amount: number;
}

export type IProductsMap = Map<number, string>;
