import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-stores',
  standalone: true,
  templateUrl: './stores-page.component.html',
  styleUrls: ['./stores-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoresPageComponent {}
