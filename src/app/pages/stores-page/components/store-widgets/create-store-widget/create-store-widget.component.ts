import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, TrackByFunction, inject } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';

import { Subscription } from 'rxjs/internal/Subscription';

import { ProductsService, ApiStoresService } from '@shared/services';
import { WidgetStoreService } from '../services';
import { fadeInAnimation } from '@shared/utils';
import { IProductsMap } from '@shared/models';
import { InputComponent, CheckboxComponent, SelectComponent } from '@shared/ui/controls';
import { ButtonComponent, CounterButtonComponent } from '@shared/ui/buttons';

@Component({
  selector: 'app-create-store-widget',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    CounterButtonComponent,
    ButtonComponent,
    InputComponent,
    CheckboxComponent,
    SelectComponent,
  ],
  templateUrl: './create-store-widget.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation],
})
export class CreateStoreWidgetComponent implements OnInit, OnDestroy {
  productMap: IProductsMap = new Map();
  storeForm!: FormGroup;

  showAnimation: boolean[] = [true];
  storeHasInventory = false;

  trackByFn: TrackByFunction<IProductsMap> = (_, index) => index;
  subscription = new Subscription();

  private readonly fb = inject(FormBuilder);
  private readonly productsService = inject(ProductsService);
  private readonly storeService = inject(ApiStoresService);
  private readonly widgetStoreService = inject(WidgetStoreService);

  get productList(): string[] {
    return Array.from(this.productMap.values());
  }

  get productsFormArray(): FormArray {
    return this.storeForm.get('products') as FormArray;
  }

  get productsFormControl(): AbstractControl<string, string>[] {
    return this.productsFormArray.controls;
  }

  get storeNameControl(): AbstractControl<string, string> | null {
    return this.storeForm?.get('storeName');
  }

  get inventoryControl(): AbstractControl<string, string> | null {
    return this.storeForm?.get('hasInventory');
  }

  ngOnInit(): void {
    this.setProductMap();
    this.initForm();
    this.setStoreInventory();
  }

  initForm(): void {
    this.storeForm = this.fb.group({
      products: this.fb.array([]),
      hasInventory: false,
      storeName: ['', [Validators.required, Validators.minLength(3)]],
    });
    this.addFormGroup();
  }

  setStoreInventory(): void {
    this.disabledStoreGroup();
    const hasInventorySubs = this.inventoryControl?.valueChanges.subscribe(checked => {
      this.disabledStoreGroup(!checked);
    });

    this.subscription.add(hasInventorySubs);
  }

  setProductMap(): void {
    this.productMap = this.productsService.cacheProducts;
  }

  addFormGroup(numberOfGroup = 1): void {
    for (let i = 0; i < numberOfGroup; i++) {
      this.productsFormArray.push(this.getNewFormGroup());
    }
  }

  deleteFormGroup(index: number): void {
    if (this.productsFormArray && index >= 0 && index < this.productsFormArray.length) {
      this.productsFormArray.removeAt(index);
    }
  }

  getNewFormGroup(): FormGroup {
    return this.fb.group({
      productSelected: [],
      amount: [0],
    });
  }

  createStore(): void {
    this.updateStores();
    this.clearForm();
    this.addFormGroup();
    this.disabledStoreGroup();
  }

  updateStores(): void {
    const { storeName, products } = this.storeForm.value;
    const newStore = this.widgetStoreService.transformFormValueToNewStore(products, storeName, this.productMap);

    const storesSubs = this.storeService.createStore(newStore).subscribe();

    this.subscription.add(storesSubs);
  }

  clearForm(): void {
    this.storeForm.reset();
    this.productsFormArray.clear();
  }

  disabledStoreGroup(checked = true): void {
    this.storeHasInventory = checked;
    this.storeHasInventory ? this.productsFormArray.disable() : this.productsFormArray.enable();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
