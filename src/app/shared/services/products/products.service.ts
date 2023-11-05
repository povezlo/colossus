import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, of, shareReplay, switchMap } from 'rxjs';
import { IProduct } from '@shared/models';
import { ApiClientBaseService } from '@shared/services/api';

const ROUTE_PRODUCTS = 'products';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private cache: IProduct[] = [];

  private placeholderSubject$ = new BehaviorSubject<number>(1);
  private readonly _cacheContent = new Map<string, Observable<IProduct[]>>();

  private readonly http = inject(ApiClientBaseService);

  getProducts(): Observable<IProduct[]> {
    console.log('cache', this.cache);
    if (this.cache.length) {
      return of(this.cache);
    } else {
      return this.http.get<IProduct[]>(ROUTE_PRODUCTS).pipe(
        map((data: IProduct[]) => {
          this.cache = data;
          console.log('cache', this.cache);
          return data;
        })
      );
    }
  }
}
