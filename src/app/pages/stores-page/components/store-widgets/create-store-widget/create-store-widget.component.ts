import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { fadeInAnimation } from '@shared/utils';
import { IProductsMap } from '@shared/models';
import { InputComponent } from '@shared/controls';

@Component({
  selector: 'app-create-store-widget',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './create-store-widget.component.html',
  styleUrls: ['./create-store-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation],
})
export class CreateStoreWidgetComponent implements OnInit, OnDestroy {
  @Input({ required: true }) productMap: IProductsMap = new Map();
  storeForm!: FormGroup;

  showFields: boolean[] = [true];
  hasError = false;

  subscription = new Subscription();

  private readonly fb = inject(FormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);

  get storeFormControl(): AbstractControl<any, any>[] {
    return (<FormArray>this.storeForm.get('store')).controls;
  }

  get storeName(): AbstractControl<string, string> | null {
    return this.storeForm?.get('storeName');
  }

  ngOnInit(): void {
    this.initForm();
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

  createStore(): void {
    this.storeForm.updateValueAndValidity();
  }

  addFormGroup(numberOfGroup = 1): void {
    const productsArray = this.storeForm?.get('store') as FormArray;
    for (let i = 0; i < numberOfGroup; i++) {
      productsArray.push(this.createFormGroup());
    }
    this.showFields.push(true);
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      productSelected: [''],
      count: [''],
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
