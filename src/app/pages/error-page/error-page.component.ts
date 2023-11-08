import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-error-page',
  standalone: true,
  templateUrl: './error-page.component.html',
  styles: [':host { width: 100%; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPageComponent {}
