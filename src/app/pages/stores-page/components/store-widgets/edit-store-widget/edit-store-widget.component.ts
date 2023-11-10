import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';

import { Observable, Subscription, filter, tap } from 'rxjs';

import { IStoreProductData, RoutePath } from '@shared/models';
import { ApiStoresService, ButtonComponent } from '@shared/services';

@Component({
  selector: 'app-edit-store-widget',
  standalone: true,
  imports: [AsyncPipe, NgIf, RouterLink, ButtonComponent],
  templateUrl: './edit-store-widget.component.html',
  styleUrls: ['./edit-store-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditStoreWidgetComponent implements OnInit, OnDestroy {
  params$: Observable<IStoreProductData> | null = null;
  storeName = '';

  private storesService = inject(ApiStoresService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private subscription = new Subscription();

  ngOnInit(): void {
    this.initParams();
  }

  initParams(): void {
    this.params$ = this.route.params.pipe(
      filter((params: Params | IStoreProductData): params is IStoreProductData => params.id),
      tap(params => (this.storeName = String(params.id)))
    );
  }

  goBack(): void {
    this.router.navigate([RoutePath.CREATE_STORE], {
      relativeTo: this.route.parent,
    });
  }

  deleteStore(): void {
    const storesSubs = this.storesService.deleteStore({ name: this.storeName }).subscribe(() => {
      this.goBack();
    });

    this.subscription.add(storesSubs);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
