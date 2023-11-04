export interface IProductStore {
  id: number;
  amount: number;
}

export interface IStore {
  name: string;
  products: IProductStore[];
}
