import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClientSelectResults } from 'src/app/common/models/client-select-results';
import { Enum } from 'src/app/common/models/enum';
import { ClientService } from 'src/app/_services/client.service';
import { ComuniService } from 'src/app/_services/comuni.service';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {

  @ViewChild('client')
  client = {} as ClientSelectResults;

  @Input()
  isStandalone = true;
  isUpdate = false;
  isClientLoaded = false;

  public regioniView = [] as Enum[];
  public regioniList = [] as Enum[];
  public provinceView = [] as Enum[];
  public provinceList = [] as Enum[];
  public comuniView = [] as Enum[];
  public comuniList = [] as Enum[];

  regioneSelection: any;
  provinciaSelection: any;

  protected _onDestroy = new Subject();

  constructor(private route: ActivatedRoute, private service: ClientService, private comuniService: ComuniService, private router: Router) { }

  nomeFormControl = new FormControl('', [Validators.required]);
  cognomeFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.email]);
  telefonoFormControl = new FormControl('', [Validators.required, Validators.pattern('([0-9+ ]{8,17})')]);
  regioneFilterCtrl: FormControl = new FormControl();
  provinciaFilterCtrl: FormControl = new FormControl();
  comuneFilterCtrl: FormControl = new FormControl();

  ngOnInit(): void {
    this.client = new ClientSelectResults();
    this.regioniList = this.regioniView = this.comuniService.regioni;
    this.regioneFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterRegioni();
        if(this.regioneSelection != undefined){
          this.getProvince(this.regioneSelection);
        }
      });


      this.provinciaFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterProvince();
        if(this.provinciaSelection != undefined){
          this.getComuni(this.provinciaSelection);
        }
      });

      this.comuneFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterComuni();
      });

    var id = this.route.snapshot.params.id;
    if (id != undefined) {
      this.loadData(id);
      this.isUpdate = true;
    }
  }

  protected filterRegioni() {
    let search = this.regioneFilterCtrl.value;
    if (!search) {
      this.regioniView = this.regioniList.slice();
      return;
    } else {
      this.regioniView = [] as Enum[];
      this.regioniList.forEach((element: { value: number, text: string; }) => {
        if(element.text.includes(search)){
          this.regioniView.push(element);
        }
      });
    }
  }

  protected filterProvince() {
    let search = this.provinciaFilterCtrl.value;
    if (!search) {
      this.provinceView = this.provinceList.slice();
      return;
    } else {
      this.provinceView = [] as Enum[];
      this.provinceList.forEach((element: { value: number, text: string; }) => {
        if(element.text.includes(search)){
          this.provinceView.push(element);
        }
      });
    }
  }

  protected filterComuni() {
    let search = this.comuneFilterCtrl.value;
    if (!search) {
      this.comuniView = this.comuniList.slice();
      return;
    } else {
      this.comuniView = [] as Enum[];
      this.comuniList.forEach((element: { value: number, text: string; }) => {
        if(element.text.includes(search)){
          this.comuniView.push(element);
        }
      });
    }
  }

  getProvince(value: any) {
    this.comuniService.getProvince(value).subscribe((data) => {
      var res = JSON.parse(data);
      res.forEach((element: { _provincia: string; _sigla: number; }) => {
        var f = new Enum(element._provincia, element._sigla);
        this.provinceList.push(f);
      });
      this.provinceView = this.provinceList;
    })
  }

  getComuni(value: any) {
    this.comuniService.getComuni(value).subscribe((data) => {
      var res = JSON.parse(data);
      res.forEach((element: { _comune: string; _cap: number; }) => {
        var f = new Enum(element._comune, element._cap);
        this.comuniList.push(f);
      });
      this.comuniView = this.comuniList;
    });
  }

  clickUpdate(){
    this.service.updateClient(this.client).subscribe((data) => {
      console.log(data);
    });
  }

  clickSave(){
    var userExists = false;
    this.service.getClient(this.client._nome, this.client._cognome, this.client._telefono).subscribe((data) => {
      if(data != []){
        var res = JSON.parse(data);
        console.log(res);
      } 
    });
    this.service.getClient(this.client._nome, this.client._cognome).subscribe((data) => {
      if(data != []){
        var res = JSON.parse(data);
        console.log(res);
      } 
    });

    if(userExists){
      //@@@@@@@@@@@@@@@@@@@ - errore? popup con continua probably
    } else {
      this.doSaveClient();
    }
  }

  doSaveClient() {
    this.service.saveClient(this.client).subscribe((data) =>{
      console.log(data);
    });
  }

  clickBack(){
    this.router.navigate(['/client']);
  }

  loadData(id: any){
    this.service.getClientById(id).subscribe((data) =>{
      var res = JSON.parse(data)[0];
      console.log(data);
      this.client = res;
      console.log(this.client);
      this.isClientLoaded = true;
      this.getProvince(res._cod_regione);
      this.getComuni(res._sigla);
      this.regioneSelection = res._cod_regione;
      this.provinciaSelection = res._sigla;
      
    });
  }

}
