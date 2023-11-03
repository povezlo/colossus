import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedLoaderState } from './enum';
import { LoaderService } from './loader.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-shared-loader',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './shared-loader.component.html',
  styleUrls: ['./shared-loader.component.scss'],
})
export class SharedLoaderComponent implements OnInit {
  sharedLoaderState = SharedLoaderState;
  state$: Observable<SharedLoaderState> | null = null;

  loaderService = inject(LoaderService);

  ngOnInit(): void {
    this.state$ = this.loaderService.loaderState$;
  }
}
