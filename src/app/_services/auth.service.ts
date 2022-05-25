import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { webApiUrl } from '../_shared/globals'

const AUTH_API = webApiUrl + '/auth/';
const register_api = webApiUrl + '/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }



  login(username: string, password: string): Observable<any> {
    let body = `username=${username}&password=${password}&grant_type=password`;
    return this.http.post(AUTH_API + 'signin', body, httpOptions);
  }

  register(nome: string, email: string, passwd: string, permission: number): Observable<any> {
    return this.http.post(register_api, {
      nome,
      email,
      passwd,
      permission
    }, httpOptions);
  }

  refreshToken(token: string) {
    let body = `token=${token}`;
    return this.http.post(AUTH_API + 'signin', body, httpOptions);
  }
}
