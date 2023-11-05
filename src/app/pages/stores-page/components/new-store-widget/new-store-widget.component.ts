import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-store-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-store-widget.component.html',
  styleUrls: ['./new-store-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewStoreWidgetComponent {

}
