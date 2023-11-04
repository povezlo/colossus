import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientBaseService } from './api-client-base.services';
import { IProduct, IStore, LoaderService } from '@shared/models';

const PATH_STORES = 'stores';
const PATH_PRODUCTS = 'products';

@Injectable({ providedIn: 'root' })
export class ApiStoresService {
  private readonly http = inject(ApiClientBaseService);
  private loader = inject(LoaderService);

  getStores(): Observable<IStore[]> {
    return this.http.get<IStore[]>(PATH_STORES);
  }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(PATH_PRODUCTS);
  }

  createStore(params: IStore): Observable<IStore> {
    return this.http.put<IStore>(PATH_STORES, params);
  }

  deleteStore<T>(params: Pick<IStore, 'name'>): Observable<T> {
    return this.http.delete<T>(PATH_STORES, params);
  }
}
