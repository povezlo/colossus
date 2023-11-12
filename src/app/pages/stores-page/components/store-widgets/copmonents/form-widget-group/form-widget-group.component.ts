import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, forwardRef, inject } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { InputComponent, SelectComponent } from '@shared/ui/controls';
import { CounterButtonComponent } from '@shared/ui/buttons';
import { ProductsService } from '@shared/services';
import { IProductsMap } from '@shared/models';

@Component({
  selector: 'app-form-group',
  standalone: true,
  imports: [ReactiveFormsModule, forwardRef(() => CounterButtonComponent), SelectComponent, InputComponent, NgIf],
  viewProviders: [],
  templateUrl: './form-widget-group.component.html',
})
export class FormWidgetGroupComponent implements OnInit {
  @Input() controlName = 0;
  @Input() label = '';
  @Input() index = 0;
  @Input() productsFormControlLength = 0;
  @Input() productsFormControl: AbstractControl<string, string> | null = null;
  @Input() isDisabled = false;
  @Output() add = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  productMap: IProductsMap = new Map();

  private parentContainer = inject(ControlContainer);
  private readonly productsService = inject(ProductsService);

  get parentFormGroup(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }

  get productList(): string[] {
    return Array.from(this.productMap.values());
  }

  ngOnInit(): void {
    this.setProductMap();
  }

  setProductMap(): void {
    this.productMap = this.productsService.cacheProducts;
  }

  addFormGroup(): void {
    this.add.emit();
  }

  deleteFormGroup(): void {
    this.delete.emit();
  }
}
