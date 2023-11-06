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
import { fadeInAnimation } from './animation';
import { Subscription } from 'rxjs';
import { IProductsMap } from '@shared*';

@Component({
  selector: 'app-store-widget',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './store-widget.component.html',
  styleUrls: ['./store-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation],
})
export class StoreWidgetComponent implements OnInit, OnDestroy {
  @Input({ required: true }) productMap: IProductsMap = new Map();
  diagnosesForm!: FormGroup;

  showFields: boolean[] = [true];
  minDate = new Date();
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
