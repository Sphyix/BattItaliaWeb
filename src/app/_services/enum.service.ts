import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webApiUrl } from '../_shared/globals';


const API_URL = webApiUrl + '/enum/';

@Injectable({
  providedIn: 'root'
})
export class EnumService {
  

  constructor(private http: HttpClient) { }

  getPermissions(): Observable<any> {
    return this.http.get(API_URL + "permissions", { responseType: 'text' });
  }
}
