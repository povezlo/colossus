import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgSwitch, NgSwitchDefault, NgSwitchCase } from '@angular/common';

import { FooterComponent, HeaderComponent } from '@shared/components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgSwitch, NgSwitchDefault, NgSwitchCase, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
