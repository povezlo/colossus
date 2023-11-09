export type PropagateFn<T> = (fn: T) => void;

export interface ProductsFormArray {
  amount: number;
  productSelected: string;
}

export type PrimitiveValue = string | number | boolean | null | undefined;
