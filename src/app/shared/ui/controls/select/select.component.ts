import { NgForOf } from '@angular/common';
import {
  Component,
  Input,
  forwardRef,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { noop } from 'rxjs';

import { PrimitiveValue, PropagateFn } from '@shared/models';

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
export class SelectComponent implements AfterViewInit, ControlValueAccessor {
  @Input() options: string[] = [];
  @Input() isDisabled: boolean | null = null;
  @Output() changed = new EventEmitter<PrimitiveValue>();

  value: PrimitiveValue = null;

  private propagateChange: PropagateFn<PrimitiveValue> = noop;
  private propagateTouched: PropagateFn<void> = noop;

  ngAfterViewInit(): void {
    this.setStartOption();
  }

  writeValue(value: PrimitiveValue): void {
    this.value = value;
  }

  registerOnChange(fn: PropagateFn<PrimitiveValue>): void {
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
    this.emitChangedValue(value);
  }

  setStartOption() {
    this.emitChangedValue(this.options[0]);
  }

  emitChangedValue(value: PrimitiveValue) {
    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
  }
}
