import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSelectResults } from '../common/models/user-select-results';
import { webApiUrl } from '../_shared/globals';


const API_URL = webApiUrl + '/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(API_URL, { responseType: 'text' });
  }

  getUser(id: number): Observable<any> {
    return this.http.get(API_URL + "/" + id );
  }

  updateUser(user: UserSelectResults): Observable<any>{
    return this.http.patch(API_URL + "/" + user.users_id, user);
  }

  saveUser(user: UserSelectResults): Observable<any>{
    return this.http.post(API_URL, user);
  }

  getPagePermissions(){
    return this.http.get(webApiUrl + '/pagepermissions')
  }
}
