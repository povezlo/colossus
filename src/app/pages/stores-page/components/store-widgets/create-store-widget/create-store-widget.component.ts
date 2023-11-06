import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { fadeInAnimation } from '@shared/utils';
import { IProductsMap } from '@shared/models';

@Component({
  selector: 'app-create-store-widget',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './create-store-widget.component.html',
  styleUrls: ['./create-store-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation],
})
export class CreateStoreWidgetComponent implements OnInit, OnDestroy {
  @Input({ required: true }) productMap: IProductsMap = new Map();
  diagnosesForm!: FormGroup;

  showFields: boolean[] = [true];
  hasError = false;

  subscription = new Subscription();

  private readonly fb = inject(FormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);

  get diagnosisControl(): AbstractControl<any, any>[] {
    return (<FormArray>this.diagnosesForm.get('diagnosis')).controls;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.diagnosesForm = this.fb.group({
      diagnosis: this.fb.array([]),
      selectedDate: ['', Validators.required],
    });
    this.addFormGroup();
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      select: [''],
      note: [''],
    });
  }

  addFormGroup(numberOfGroup = 1): void {
    const productsArray = this.diagnosesForm?.get('diagnosis') as FormArray;
    for (let i = 0; i < numberOfGroup; i++) {
      productsArray.push(this.createFormGroup());
    }
    this.showFields.push(true);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
