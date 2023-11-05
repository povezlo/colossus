import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';

import { Observable } from 'rxjs';
import { LoaderState } from './enum';

import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  loaderState = LoaderState;
  state$: Observable<LoaderState> | null = null;

  private loaderService = inject(LoaderService);

  ngOnInit(): void {
    this.state$ = this.loaderService.loaderState$;
  }
}
