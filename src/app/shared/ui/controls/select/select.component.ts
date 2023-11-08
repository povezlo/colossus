import { NgForOf } from '@angular/common';
import { Component, Input, forwardRef, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { PropagateFn } from '@shared/models';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() options: string[] = [];
  @Input() isDisabled: boolean | null = null;
  @Output() changed = new EventEmitter<string>();

  value: string | null = null;

  private propagateChange?: PropagateFn<string>;
  private propagateTouched?: PropagateFn<void>;

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: PropagateFn<string>): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: PropagateFn<void>): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  selectOption(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    if (this.propagateChange) this.propagateChange(value);
    this.changed.emit(this.value);
  }
}
