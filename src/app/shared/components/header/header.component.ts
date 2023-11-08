import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent, MenuItemComponent } from '../../ui';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MenuComponent, MenuItemComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
