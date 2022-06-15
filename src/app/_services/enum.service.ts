import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enum } from '../common/models/enum';
import { webApiUrl } from '../_shared/globals';


const API_URL = webApiUrl + '/enum/';

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

    if (this.stati.length == 0) {
      this.loadStato();
    }

    if (this.difficolta.length == 0) {
      this.loadDifficolta();
    }

    if (this.tipoOggetti.length == 0) {
      this.loadTipoOggetto();
    }
  }

  // async loadPermissions() {
  //   await this.loadUserPermissions().then(() => {
  //     return;
  //   });
  // }

  async loadUserPermissions() {
    return new Promise( resolve =>  this.http.get(API_URL + "permissions", { responseType: 'text' }).subscribe(data => {
      var res = JSON.parse(data);
      res.forEach((element: { user_permission: string; user_permission_id: number; }) => {
        var f = new Enum(element.user_permission, element.user_permission_id);
        this.permissions.push(f);
      });
      resolve("");
    })
    );
  }

  getPermission(id: number) {
    var f = "";
    this.permissions?.forEach(element => {
      if(element.value == id){
        f = element.text;
      }
    });
    return f;
  }


  private loadStato() {
    this.http.get(API_URL + "stato", { responseType: 'text' }).subscribe(data => {
      var res = JSON.parse(data);
      res.forEach((element: { stato: string; workOrder_stato_id: number; }) => {
        var f = new Enum(element.stato, element.workOrder_stato_id);
        this.stati.push(f);
      });
    });
  }

  getStato(id: number) {
    var f = "";
    if (this.stati?.length >= id) {
      f = this.stati[id].text;
    }
    return f;
  }

  private loadDifficolta() {
    this.http.get(API_URL + "difficolta", { responseType: 'text' }).subscribe(data => {
      var res = JSON.parse(data);
      res.forEach((element: { difficolta: string; workOrder_difficolta_id: number; }) => {
        var f = new Enum(element.difficolta, element.workOrder_difficolta_id);
        this.difficolta.push(f);
      });
    });
  }

  getDifficolta(id: number) {
    var f = "";
    if (this.difficolta?.length >= id) {
      f = this.difficolta[id].text;
    }
    return f;
  }

  private loadTipoOggetto() {
    this.http.get(API_URL + "tipooggetto", { responseType: 'text' }).subscribe(data => {
      var res = JSON.parse(data);
      res.forEach((element: { oggetto_nome: string; tipoOggetto_id: number; }) => {
        var f = new Enum(element.oggetto_nome, element.tipoOggetto_id);
        this.tipoOggetti.push(f);
      });
    });
  }

  addTipoOggetto(nomeOggetto: string) {
    this.http.post(API_URL, nomeOggetto).subscribe(data => {
      if (data == true) {
        this.loadTipoOggetto();
      }
    });
  }

  getTipoOggetto(id: number) {
    var f = "";
    if (this.tipoOggetti?.length >= id) {
      f = this.tipoOggetti[id].text;
    }
    return f;
  }


}
