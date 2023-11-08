import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent, NavbarItemComponent } from '../../ui';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavbarComponent, NavbarItemComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
