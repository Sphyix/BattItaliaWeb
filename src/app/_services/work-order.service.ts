import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webApiUrl } from '../_shared/globals';

const API_URL = webApiUrl + '/workorder';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'  })
};

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {

  constructor(private http: HttpClient) { }

  getWorkOrders(): Observable<any> {
    return this.http.get(API_URL, { responseType: 'text' });
  }
}
