import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import {
  ApiStoresService,
  IStore,
  LoaderService,
  SharedLoaderComponent,
  SharedLoaderState,
} from '@shared*';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-stores',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, SharedLoaderComponent],
  templateUrl: './stores-page.component.html',
  styleUrls: ['./stores-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoresPageComponent implements OnInit {
  stores$: Observable<IStore[]> | null = null;

  private storesService = inject(ApiStoresService);
  private loader = inject(LoaderService);

  ngOnInit(): void {
    this.loader.loaderStateSource$.next(SharedLoaderState.loading);
    this.stores$ = this.storesService.getStores().pipe(
      tap(res => {
        if (!res.length) {
          this.loader.loaderStateSource$.next(SharedLoaderState.noData);
          return;
        }
        this.loader.loaderStateSource$.next(SharedLoaderState.loaded);
      })
    );
  }
}
