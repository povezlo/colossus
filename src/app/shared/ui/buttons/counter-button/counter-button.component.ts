import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component, Input } from '@angular/core';

export type ActionType = 'plus' | 'minus';

@Component({
  selector: 'app-counter-button',
  standalone: true,
  styles: ['.btn-square { width: 2rem; height: 2rem }'],
  imports: [NgSwitchCase, NgSwitch, NgSwitchDefault],
  templateUrl: './counter-button.component.html',
})
export class CounterButtonComponent {
  @Input() actionType: ActionType = 'plus';
  @Input() disabled: boolean | null = null;

  onClicked = (e: Event) => {
    if (this.disabled) e.stopPropagation();
  };
}
