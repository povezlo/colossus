import { NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMostPopularProduct, ISharedStoreData, RoutePath } from '@shared/models';
@Component({
  selector: 'app-store',
  standalone: true,
  imports: [NgIf, NgForOf],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreComponent {
  @Input({ required: true }) store: ISharedStoreData | null = null;
  @Input({ required: true }) tabindex!: number;

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  get mostPopularProduct(): IMostPopularProduct | undefined {
    return this.store?.mostPopularProduct;
  }

  openEditWidget(): void {
    if (!this.store) return;
    this.router.navigate(['./', { outlets: { widget: [RoutePath.EDIT_STORE, this.store.name] } }], {
      relativeTo: this.route,
    });
  }
}
