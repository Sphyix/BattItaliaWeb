import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webApiUrl } from '../_shared/globals';

const API_URL = webApiUrl + '/userworkorders';

@Injectable({
  providedIn: 'root'
})
export class UserworkordersService {

  constructor(private http: HttpClient) { }

  getUserWorkOrders(id: number): Observable<any> {
    return this.http.get(API_URL, { responseType: 'text' });
  }
}
