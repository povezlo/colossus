import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IStore } from 'src/app/shared/models';

@Component({
  selector: 'app-store-list',
  standalone: true,
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreListComponent implements OnInit {
  @Input({ required: true }) readonly store: IStore | null = null;

  get totalItems(): number {
    return this.store?.products.reduce((total, item) => total + item.id);
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
