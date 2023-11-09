import { Component, ChangeDetectionStrategy, forwardRef, Input, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, AbstractControl } from '@angular/forms';

import { noop } from 'rxjs';

import { PropagateFn } from '@shared/models';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  templateUrl: './checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input({ required: true }) control: AbstractControl | null = null;
  @Input() value = false;
  @Input() label = '';
  @Input() id = 'defaultId';
  @Input() isDisabled = false;
  @Output() changed = new EventEmitter<boolean>();

  private propagateChange: PropagateFn<boolean> = noop;
  private propagateTouched: PropagateFn<void> = noop;

  writeValue(value: boolean): void {
    this.value = !!value;
    this.emitChangedValue(this.value);
  }

  registerOnChange(fn: PropagateFn<boolean>): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: PropagateFn<void>): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChanged(evt: Event): void {
    const selected = (evt.target as HTMLInputElement).checked;
    this.emitChangedValue(selected);
  }

  emitChangedValue(value: boolean) {
    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
  }
}
