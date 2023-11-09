import { Component, ChangeDetectionStrategy, forwardRef, Input, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, AbstractControl } from '@angular/forms';
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
  @Input() label = '';
  @Input() value = false;
  @Input({ required: true }) control: AbstractControl | null = null;
  @Output() changed = new EventEmitter<boolean>();

  isDisabled = false;

  private propagateChange?: PropagateFn<boolean>;
  private propagateTouched?: PropagateFn<void>;

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
    if (this.propagateChange) this.propagateChange(value);
    this.changed.emit(value);
  }
}
