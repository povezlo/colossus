import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
  template: `<p>home-page works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {}
