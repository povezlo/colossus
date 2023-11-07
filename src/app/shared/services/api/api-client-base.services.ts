import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { BASE_URL } from 'src/app/core';
import { IHttpParams } from '@shared/models';

const CONTENT_TYPE = 'application/json';
@Injectable({ providedIn: 'root' })
export class ApiClientBaseService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(BASE_URL);

  get<T>(path: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${path}`);
  }

  post<T>(path: string, params: IHttpParams): Observable<T> {
    const headers = new HttpHeaders({ 'Content-Type': CONTENT_TYPE });

    return this.http.post<T>(`${this.baseUrl}/${path}`, { params }, { headers });
  }

  delete<T>(path: string, params: { name: string }): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${path}`, { body: params });
  }
}
