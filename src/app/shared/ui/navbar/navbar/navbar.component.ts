import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  isMobileMode = false;

  toggleShowMenu(): void {
    this.isMobileMode = !this.isMobileMode;
  }
}
