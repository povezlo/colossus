import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  standalone: true,
  imports: [RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemComponent {
  @Input() title = 'Link';
  @Input() outlet = 'primary';
  @Input({ required: true }) routeName = '';
  @Input() linkActiveExact = false;

  get route(): { [x: string]: string } {
    return { [this.outlet]: this.routeName };
  }
}
