import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

export type ButtonAction = 'plus' | 'minus';

@Component({
  selector: 'app-counter-button',
  standalone: true,
  styles: ['.btn-square { width: 37px; height: 37px; }'],
  imports: [NgIf],
  templateUrl: './counter-button.component.html',
})
export class CounterButtonComponent {
  @Input() action: ButtonAction = 'plus';
  @Input() disabled: boolean | null = null;

  onClicked = (e: Event) => {
    if (this.disabled) e.stopPropagation();
  };
}
