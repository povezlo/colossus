export type PropagateFn<T> = (fn: T) => void;

export interface IProductsFormArray {
  amount: number;
  productSelected: string;
}

export interface IStoreFormValue {
  storeName: string;
  products: IProductsFormArray[];
}

export type PrimitiveValue = string | number | boolean | null | undefined;
