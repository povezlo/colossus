import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/core';

const CONTENT_TYPE = 'application/x-www-form-urlencoded';
@Injectable({ providedIn: 'root' })
export class ApiClientBaseService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(BASE_URL);

  get<T>(path: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${path}`);
  }

  put<T>(path: string, params: any): Observable<T> {
    const headers = new HttpHeaders({ 'Content-Type': CONTENT_TYPE });
    const httpParams = new HttpParams({ fromObject: params });

    return this.http.put<T>(`${this.baseUrl}/${path}`, { httpParams }, { headers });
  }

  delete<T>(path: string, params: { name: string }): Observable<T> {
    const httpParams = new HttpParams({ fromObject: params });

    return this.http.delete<T>(`${this.baseUrl}/${path}`, { body: httpParams });
  }
}
