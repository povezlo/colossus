import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoaderState } from './enum';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  loaderStateSource$ = new BehaviorSubject<LoaderState>(LoaderState.loading);
  loaderState$: Observable<LoaderState>;

  constructor() {
    this.loaderState$ = this.loaderStateSource$.asObservable();
  }
}
