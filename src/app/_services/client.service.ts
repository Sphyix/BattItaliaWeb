import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webApiUrl } from '../_shared/globals';

const API_URL = webApiUrl + '/client';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getClients(): Observable<any> {
    return this.http.get(API_URL, { responseType: 'text' });
  }
}
