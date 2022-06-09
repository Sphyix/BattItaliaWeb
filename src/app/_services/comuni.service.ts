import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enum } from '../common/models/enum';
import { webApiUrl } from '../_shared/globals';


const comuni_url = webApiUrl + '/comuni';
const province_url = webApiUrl + '/province';
const regioni_url = webApiUrl + '/regioni';

@Injectable({
  providedIn: 'root'
})
export class ComuniService {

  constructor(private http: HttpClient) { }

  regioni = [] as Enum[];

  getComuni(provincia: string): Observable<any> {
    return this.http.get(comuni_url + '/' + provincia, { responseType: 'text' });
  }

  getProvince(regione: number): Observable<any> {
    return this.http.get(province_url + '/' + regione, { responseType: 'text' });
  }

  loadRegioni() {
    this.http.get(regioni_url , { responseType: 'text' }).subscribe(data => {
      var res = JSON.parse(data);
      res.forEach((element: { cod_regione: number; regione: string; }) => {
        var f = new Enum(element.regione, element.cod_regione);
        this.regioni.push(f);
      });
    });
  }
}
