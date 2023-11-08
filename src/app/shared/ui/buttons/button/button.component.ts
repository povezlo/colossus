import { Component, Input } from '@angular/core';

export type ButtonType = 'button' | 'submit';
export type ColorType = 'primary' | 'success' | 'danger' | 'warning';
export type SizeType = 'large' | 'small' | 'default';
@Component({
  selector: 'app-button',
  standalone: true,
  styles: [':host { width: 100%; }'],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() type: ButtonType = 'button';
  @Input() color: ColorType = 'primary';
  @Input() size: SizeType = 'default';
  @Input() disabled?: boolean = false;
}
