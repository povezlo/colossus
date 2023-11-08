import { APP_INITIALIZER } from '@angular/core';
import { LoaderService, LoaderState } from '@shared/components';
import { BASE_URL } from '../injectTokens';

export function provideBaseUrl(value: string) {
  return { provide: BASE_URL, useValue: value };
}

export function provideInitializeApp() {
  return {
    provide: APP_INITIALIZER,
    useFactory: initializeAppFactory,
    multi: true,
    deps: [LoaderService],
  };
}

function initializeAppFactory(loader: LoaderService): () => void {
  return () => loader.loaderStateSource$.next(LoaderState.loading);
}
