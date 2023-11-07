export type PropagateFn<T> = (fn: T) => void;

export interface ProductsFormArray {
  amount: number;
  productSelected: string;
}
