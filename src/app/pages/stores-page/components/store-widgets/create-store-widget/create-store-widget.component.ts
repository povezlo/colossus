import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, TrackByFunction, inject } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { ProductsService, fadeInAnimation } from '@shared/utils';
import { IProductsMap } from '@shared/models';
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
  hasError = false;


  trackByFn: TrackByFunction<IProductsMap> = (_, index) => index;
  subscription = new Subscription();

  private readonly fb = inject(FormBuilder);
  private readonly productsService = inject(ProductsService);

  get storeFormControl(): AbstractControl<any, any>[] {
    return (<FormArray>this.storeForm.get('store')).controls;
  }

  get storeName(): AbstractControl<string, string> | null {
    return this.storeForm?.get('storeName');
  }

  ngOnInit(): void {
    this.productMap = this.getProductMap();
    this.initForm();
    console.log(this.productMap);
    this.storeForm.valueChanges.subscribe((data: any) => {
      console.log(data);
    });
  }

  initForm(): void {
    this.storeForm = this.fb.group({
      store: this.fb.array([]),
      storeName: ['', [Validators.required, Validators.minLength(3)]],
    });
    this.addFormGroup();
  }

  getProductMap(): IProductsMap {
    return this.productsService.cacheProducts;
  }

  addFormGroup(numberOfGroup = 1): void {
    const productsArray = this.storeForm?.get('store') as FormArray;
    for (let i = 0; i < numberOfGroup; i++) {
      productsArray.push(this.createFormGroup());
    }
    this.showFields.push(true);
  }

  deleteFormGroup(index: number): void {
    const productsArray = this.storeForm.get('store') as FormArray;

    if (productsArray && index >= 0 && index < productsArray.length) {
      productsArray.removeAt(index);
    }
    this.showFields.push(true);
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      productSelected: [this.productMap.get(1)],
      count: [0],
    });
  }

  createStore(): void {
    this.storeForm.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
