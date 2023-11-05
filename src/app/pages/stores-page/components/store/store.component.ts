import { NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { IMostPopularProduct, ISharedStore } from '@shared/models';
import { TotalAmountPipe } from '@shared/p IStoreipes';
@Component({
  selector: 'app-store',
  standalone: true,
  imports: [TotalAmountPipe, NgIf, NgForOf],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreComponent {
  @Input({ required: true }) store: ISharedStore | null = null;

  get mostPopularProduct(): IMostPopularProduct | undefined {
    return this.store?.mostPopularProduct;
  }
}
