import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-store-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-store-widget.component.html',
  styleUrls: ['./edit-store-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditStoreWidgetComponent {}
