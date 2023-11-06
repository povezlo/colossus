import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-store-list',
  standalone: true,
  imports: [],
  templateUrl: './store-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreListComponent {}
