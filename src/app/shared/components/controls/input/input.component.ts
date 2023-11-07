import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, Output, EventEmitter, inject } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, AbstractControl } from '@angular/forms';
import { PropagateFn } from 'src/app/shared/models';
import { ValidatorService } from 'src/app/shared/services';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() placeholder = '';
  @Input() label = '';
  @Input() required = false;
  @Input() isDisabled = false;
  @Input({ required: true }) control: AbstractControl | null = null;
  @Output() changed = new EventEmitter<string>();

  value = '';
  private propagateChange?: PropagateFn<string>;
  private propagateTouched?: PropagateFn<void>;

  validatorService = inject(ValidatorService);

  get hasError(): boolean {
    return !!this.control?.errors && this.control?.dirty;
  }

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

  onKeyup(eventInput: Event): void {
    this.value = (<HTMLInputElement>eventInput.target).value;
    if (this.propagateChange) this.propagateChange(this.value);
    this.changed.emit(this.value);
  }

  onBlur(): void {
    if (this.propagateTouched) this.propagateTouched();
  }

  getErrorMessage(): string {
    return this.control?.errors ? this.validatorService.getErrorMessage(this.control.errors) : '';
  }
}
