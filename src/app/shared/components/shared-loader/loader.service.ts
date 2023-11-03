import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SharedLoaderState } from './enum';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  loaderStateSource$ = new BehaviorSubject<SharedLoaderState>(SharedLoaderState.loading);
  loaderState$: Observable<SharedLoaderState>;

  constructor() {
    this.loaderState$ = this.loaderStateSource$.asObservable();
  }
}
