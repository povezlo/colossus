import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ProductsService } from '@shared/services';

export const productResolver = () => {
  const router = inject(Router);
  const productsservice = inject(ProductsService);

  return productsservice.getProducts().pipe(
    catchError(error => {
      console.log(`Retrieval error: ${error}`);
      router.navigate(['/store']);
      return of(null);
    })
  );
};
