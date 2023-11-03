import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/shared/injectTokens';
import { IHttpParams } from 'src/app/shared/models';

@Injectable({ providedIn: 'root' })
export class ApiClientService {
  constructor(
    @Inject(BASE_URL) private readonly baseUrl: string,
    private http: HttpClient
  ) {}

  get<T>(path: string, params?: IHttpParams): Observable<T> {
    const url = `${this.baseUrl}/${path}`;
    let httpParams: HttpParams;

    if (params) {
      httpParams = new HttpParams();
      Object.keys(params).forEach(function (key) {
        httpParams.append(key, params[key]);
      });
    }

    return this.http.get<T>(url, { params });
  }

  post<T>(path: string, params?: any): Observable<T> {
    const url = `${this.baseUrl}/${path}`;
    let httpParams: any;

    if (params) {
      httpParams = new HttpParams();
      Object.keys(params).forEach(function (key) {
        httpParams.append(key, params[key]);
      });
    }
    console.log({ params });

    return this.http.post<T>(url, params);
  }

  delete<T>(path: string, params: { name: string }): Observable<T> {
    const url = `${this.baseUrl}/${path}`;

    return this.http.delete<T>(url, { body: params });
  }
}
