import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-store-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-store-widget.component.html',
  styleUrls: ['./delete-store-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteStoreWidgetComponent {}
