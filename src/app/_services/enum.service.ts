import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enum } from '../common/models/enum';
import { webApiUrl } from '../_shared/globals';


const API_URL = webApiUrl + '/enum/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'  })
};

@Injectable({
  providedIn: 'root'
})
export class EnumService {

  permissions = [] as Enum[];

  stati = [] as Enum[];

  difficolta = [] as Enum[];

  tipoOggetti = [] as Enum[];

  
  

  constructor(private http: HttpClient) { }

  loadEnums() {
    this.loadUserPermissions();
    this.loadStato();
    this.loadDifficolta();
    this.loadTipoOggetto();
  }

  private loadUserPermissions() {
    this.http.get(API_URL + "permissions", { responseType: 'text' }).subscribe(data => {
      var res = JSON.parse(data);
      res.forEach((element: { _user_permission: string; _user_permission_id: number; }) => {
        var f = new Enum(element._user_permission, element._user_permission_id);
        this.permissions.push(f);
      });
    });
  }

  getPermission(id: number){
    var f = "";
    if(this.permissions? this.permissions.length >= id : false){
      f = this.permissions[id].text;
    }
    return f;
  }


  private loadStato() {
    this.http.get(API_URL + "stato", { responseType: 'text' }).subscribe(data => {
      var res = JSON.parse(data);
      res.forEach((element: { _stato: string; _workOrder_stato_id: number; }) => {
        var f = new Enum(element._stato, element._workOrder_stato_id);
        this.stati.push(f);
      });
    });
  }

  getStato(id: number){
    var f = "";
    if(this.stati?.length >= id){
      f = this.stati[id].text;
    }
    return f;
  }

  private loadDifficolta() {
    this.http.get(API_URL + "difficolta", { responseType: 'text' }).subscribe(data => {
      var res = JSON.parse(data);
      res.forEach((element: { _difficolta: string; _workOrder_difficolta_id: number; }) => {
        var f = new Enum(element._difficolta, element._workOrder_difficolta_id);
        this.difficolta.push(f);
      });
    });
  }

  getDifficolta(id: number){
    var f = "";
    if(this.difficolta?.length >= id){
      f = this.difficolta[id].text;
    }
    return f;
  }

  private loadTipoOggetto() {
    this.http.get(API_URL + "tipooggetto", { responseType: 'text' }).subscribe(data => {
      var res = JSON.parse(data);
      res.forEach((element: { _oggetto_nome: string; _tipoOggetto_id: number; }) => {
        var f = new Enum(element._oggetto_nome, element._tipoOggetto_id);
        this.tipoOggetti.push(f);
      });
    });
  }

  addTipoOggetto(nomeOggetto: string){
    this.http.post(API_URL, nomeOggetto, httpOptions).subscribe(data => {
      if(data == true){
        this.loadTipoOggetto();
      }
    });
  }

  getTipoOggetto(id: number){
    var f = "";
    if(this.tipoOggetti?.length >= id){
      f = this.tipoOggetti[id].text;
    }
    return f;
  }


}
