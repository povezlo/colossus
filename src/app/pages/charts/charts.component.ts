import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChartComponent } from '@shared/ui';
@Component({
  selector: 'app-charts',
  standalone: true,
  templateUrl: './charts.component.html',
  imports: [ChartComponent],
  styleUrl: './charts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartsComponent {}
