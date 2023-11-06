import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { ApiClientBaseService } from '@shared/services';
import { IStore, ISuccessResponse, NotificationService } from '@shared/models';

const ROUTE_STORES = 'stores';

@Injectable({ providedIn: 'root' })
export class ApiStoresService {
  private updateStores$ = new BehaviorSubject<IStore[]>([]);

  stores$ = this.updateStores$.asObservable();

  private readonly http = inject(ApiClientBaseService);
  private readonly notification = inject(NotificationService);

  getStores(): Observable<IStore[]> {
    return this.stores$.pipe(switchMap(() => this.http.get<IStore[]>(ROUTE_STORES)));
  }

  createStore(params: IStore): Observable<IStore> {
    return this.http.put<IStore>(ROUTE_STORES, params);
  }

  deleteStore(params: Pick<IStore, 'name'>): Observable<ISuccessResponse> {
    return this.http.delete<ISuccessResponse>(ROUTE_STORES, params).pipe(
      tap(res => {
        this.notification.showSuccess(`${res.message}: ${params.name}`);
        this.updateStores();
      })
    );
  }

  updateStores(): void {
    this.updateStores$.next([]);
  }
}
