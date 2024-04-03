import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private httpClient: HttpClient) { }

  private readonly url = environment.apiUrl;


  get<T>(route: string) {
    return this.httpClient.get<T>(`${this.url}/${route}`, { withCredentials: true });
  }

  post<T>(route: string, body?: any) {

    return this.httpClient.post<T>(`${this.url}/${route}`, body, { withCredentials: true });
  }

  put<T>(route: string, body?: any) {

    return this.httpClient.put<T>(`${this.url}/${route}`, body, { withCredentials: true });
  }

  delete<T>(route: string) {

    return this.httpClient.delete<T>(`${this.url}/${route}`, { withCredentials: true });
  }
}
