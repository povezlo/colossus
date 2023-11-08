import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-navbar-item',
  standalone: true,
  templateUrl: './navbar-item.component.html',
  imports: [RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarItemComponent {
  @Input() title = 'Link';
  @Input() outlet = 'primary';
  @Input({ required: true }) routeName = '';
  @Input() linkActiveExact = false;

  get route(): { [x: string]: string } {
    return { [this.outlet]: this.routeName };
  }
}
