import { Injectable, inject } from '@angular/core';
import { Observable, Subject, startWith, switchMap, tap } from 'rxjs';
import { ApiClientBaseService } from '@shared/services';
import { IStore, ISuccessResponse, NotificationService, Pathname } from '@shared/models';

@Injectable({ providedIn: 'root' })
export class ApiStoresService {
  private readonly refreshSource$ = new Subject<void>();
  private readonly refreshStores$ = this.refreshSource$.asObservable().pipe(startWith('start'));

  private readonly http = inject(ApiClientBaseService);
  private readonly notification = inject(NotificationService);

  getStores(): Observable<IStore[]> {
    return this.refreshStores$.pipe(switchMap(() => this.http.get<IStore[]>(Pathname.ROUTE_STORES)));
  }

  createStore(params: IStore): Observable<ISuccessResponse> {
    return this.http.post<ISuccessResponse>(Pathname.ROUTE_CREATE_STORES, params).pipe(
      tap(res => {
        this.notification.showSuccess(`${res.message}: ${params.name}`);
        this.refreshStores();
      })
    );
  }

  deleteStore(params: Pick<IStore, 'name'>): Observable<ISuccessResponse> {
    return this.http.delete<ISuccessResponse>(Pathname.ROUTE_DELETE_STORES, params).pipe(
      tap(res => {
        this.notification.showSuccess(`${res.message}: ${params.name}`);
        this.refreshStores();
      })
    );
  }

  refreshStores(): void {
    this.refreshSource$.next();
  }
}
