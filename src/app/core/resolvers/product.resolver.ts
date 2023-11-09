import { inject } from '@angular/core';
import { ProductsService } from '@shared/services';

export const productResolver = () => {
  return inject(ProductsService).getProducts();
};
