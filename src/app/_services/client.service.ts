import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientSelectResults } from '../common/models/client-select-results';
import { webApiUrl } from '../_shared/globals';

const API_URL = webApiUrl + '/client';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  setParams(params: HttpParams, value: any, valueName: any): HttpParams{
    if(value != undefined && value != null && value != ''){
      return params.append(valueName, value);
    }
    return params.append(valueName, '');
  }

  getClients(): Observable<any> {
    return this.http.get(API_URL, { responseType: 'text' });
  }


  getClient(nome: string, cognome: string, telefono?: string): Observable<any> {
    let params = new HttpParams();
    params = this.setParams(params, nome, 'nome');
    params = this.setParams(params, cognome, 'cognome');
    params = this.setParams(params, telefono, 'telefono');

    return this.http.get(API_URL, {params: params });
  }

  getClientById(id: number): Observable<any>{
    return this.http.get(API_URL + '/' + id, { responseType: 'text' });
  }

  updateClient(client: ClientSelectResults): Observable<any>{
    console.log(client);
    return this.http.patch(API_URL, client);
  }

  saveClient(client: ClientSelectResults): Observable<any>{
    return this.http.post(API_URL, client);
  }
}
