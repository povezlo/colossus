import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, TrackByFunction, inject } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';

import { Subscription } from 'rxjs';

import { fadeInAnimation } from '@shared/utils';
import { IProductsMap, IStore, IProductStore, ProductsFormArray } from '@shared/models';
import { ProductsService, ApiStoresService } from '@shared/services';
import { InputComponent } from '@shared/controls';

@Component({
  selector: 'app-create-store-widget',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, NgForOf, NgIf],
  templateUrl: './create-store-widget.component.html',
  styleUrls: ['./create-store-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation],
})
export class CreateStoreWidgetComponent implements OnInit, OnDestroy {
  productMap: IProductsMap = new Map();
  storeForm!: FormGroup;

  showFields: boolean[] = [true];
  storeHasInventory = false;

  trackByFn: TrackByFunction<IProductsMap> = (_, index) => index;
  subscription = new Subscription();

  private readonly fb = inject(FormBuilder);
  private readonly productsService = inject(ProductsService);
  private readonly storeService = inject(ApiStoresService);

  get productsFormArray(): FormArray {
    return this.storeForm.get('products') as FormArray;
  }

  get productsFormControl(): AbstractControl<any, any>[] {
    return this.productsFormArray.controls;
  }

  get storeName(): AbstractControl<string, string> | null {
    return this.storeForm?.get('storeName');
  }

  ngOnInit(): void {
    this.productMap = this.getProductMap();
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

  getProductMap(): IProductsMap {
    return this.productsService.cacheProducts;
  }

  addFormGroup(numberOfGroup = 1): void {
    for (let i = 0; i < numberOfGroup; i++) {
      this.productsFormArray.push(this.createFormGroup());
    }
    this.showFields.push(true);
  }

  deleteFormGroup(index: number): void {
    if (this.productsFormArray && index >= 0 && index < this.productsFormArray.length) {
      this.productsFormArray.removeAt(index);
    }
    this.showFields.push(true);
  }

  createFormGroup(): FormGroup {
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
    const newStore: IStore = this.transformFormValueToProductStores(products, storeName);

    const storesSubs = this.storeService.createStore(newStore).subscribe(store => {
      console.log(store);
    });

    this.subscription.add(storesSubs);
  }

  clearForm(): void {
    this.storeForm.reset();
    this.productsFormArray.clear();
  }

  setStoreInventory(): void {
    this.disabledStoreGroup();
    const hasInventorySubs = this.storeForm?.get('hasInventory')?.valueChanges.subscribe((checked: boolean) => {
      this.disabledStoreGroup(!checked);
    });

    this.subscription.add(hasInventorySubs);
  }

  disabledStoreGroup(checked = true): void {
    this.storeHasInventory = checked;
    this.storeHasInventory ? this.productsFormArray.disable() : this.productsFormArray.enable();
  }

  transformFormValueToProductStores(products: ProductsFormArray[], storeName: string): IStore {
    const updateProducts = products.map((product: ProductsFormArray) => ({
      amount: product.amount,
      id: this.getKeyByMap(this.productMap, product.productSelected),
    })) as IProductStore[];

    return {
      name: storeName,
      products: updateProducts.filter(product => product.id),
    };
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getKeyByMap(map: Map<number, string>, value: string) {
    for (const [key, val] of map) {
      if (val === value) {
        return key;
      }
    }
    return null;
  }
}
