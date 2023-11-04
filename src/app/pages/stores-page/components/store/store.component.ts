import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-store-list',
  standalone: true,
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreListComponent {

}
