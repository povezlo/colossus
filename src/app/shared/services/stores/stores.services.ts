import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientBaseService } from '../api/api-client-base.services';
import { IStore } from '@shared/models';

const ROUTE_STORES = 'stores';

@Injectable({ providedIn: 'root' })
export class ApiStoresService {
  private readonly http = inject(ApiClientBaseService);

  getStores(): Observable<IStore[]> {
    return this.http.get<IStore[]>(ROUTE_STORES);
  }

  createStore(params: IStore): Observable<IStore> {
    return this.http.put<IStore>(ROUTE_STORES, params);
  }

  deleteStore<T>(params: Pick<IStore, 'name'>): Observable<T> {
    return this.http.delete<T>(ROUTE_STORES, params);
  }
}
