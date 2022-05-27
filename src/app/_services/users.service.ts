import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSelectResults } from '../common/models/user-select-results';
import { webApiUrl } from '../_shared/globals';


const API_URL = webApiUrl + '/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'  })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(API_URL, { responseType: 'text' });
  }

  getUser(id: number): Observable<any> {
    return this.http.get(API_URL + "/" + id, httpOptions );
  }

  updateUser(user: UserSelectResults): Observable<any>{
    return this.http.patch(API_URL, user, httpOptions);
  }

  getPagePermissions(){
    return this.http.get(webApiUrl + '/pagepermissions', httpOptions)
  }
}
