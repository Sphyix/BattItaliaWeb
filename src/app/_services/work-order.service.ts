import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webApiUrl } from '../_shared/globals';

const API_URL = webApiUrl + '/workorder';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {

  constructor(private http: HttpClient) { }

  getWorkOrders(): Observable<any> {
    return this.http.get(API_URL, { responseType: 'text' });
  }


  setParams(params: HttpParams, value: any, valueName: any): HttpParams{
    if(value != undefined && value != null && value != ''){
      return params.append(valueName, value);
    }
    return params.append(valueName, '');
  }

  getWorkOrder(id?: number, stato?: number, difficolta?: number, modello?: string): Observable<any> {
    let params = new HttpParams();
    params = this.setParams(params, id, 'id');
    params = this.setParams(params, stato, 'stato');
    params = this.setParams(params, difficolta, 'difficolta');
    params = this.setParams(params, modello, 'modello');

    return this.http.get(API_URL, {params: params });
  }
}
