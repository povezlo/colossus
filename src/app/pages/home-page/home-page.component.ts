import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
  template: `<div class="container"></div>
    <div class="row mt-5">
      <div class="col-12 text-center"><h3>Welcome to Collossus project!</h3></div>
    </div> `,
  styles: `:host {
  width: 100%;
}
`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {}
