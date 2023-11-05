import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientBaseService } from './api-client-base.services';
import { IProduct, IStore, LoaderService } from '@shared/models';

const ROUTE_STORES = 'stores';
const ROUTE_PRODUCTS = 'products';

@Injectable({ providedIn: 'root' })
export class ApiStoresService {
  private readonly http = inject(ApiClientBaseService);
  private loader = inject(LoaderService);

  getStores(): Observable<IStore[]> {
    return this.http.get<IStore[]>(ROUTE_STORES);
  }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(ROUTE_PRODUCTS);
  }

  createStore(params: IStore): Observable<IStore> {
    return this.http.put<IStore>(ROUTE_STORES, params);
  }

  deleteStore<T>(params: Pick<IStore, 'name'>): Observable<T> {
    return this.http.delete<T>(ROUTE_STORES, params);
  }
}
