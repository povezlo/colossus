import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-store-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './store-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreListComponent {}
