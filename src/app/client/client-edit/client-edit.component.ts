import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClientSelectResults } from 'src/app/common/models/client-select-results';
import { Enum } from 'src/app/common/models/enum';
import { ErrorPopupComponent } from 'src/app/common/popups/error-popup/error-popup.component';
import { ClientService } from 'src/app/_services/client.service';
import { ComuniService } from 'src/app/_services/comuni.service';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {

  snackBarRef: any;

  client = {} as ClientSelectResults;

  cap: number;

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

  constructor(private route: ActivatedRoute, private service: ClientService, private comuniService: ComuniService,
    private router: Router, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  form = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    cognome: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.email]),
    telefono: new FormControl('', [Validators.required, Validators.pattern('([0-9+ ]{8,17})')]),
    via: new FormControl(),
    civico: new FormControl(),
    // regione: new FormControl(),
    // provincia: new FormControl(),
    // comune: new FormControl(),
  });

  regioneFilterCtrl = new FormControl();
  provinciaFilterCtrl = new FormControl();
  comuneFilterCtrl = new FormControl();

  returnValue: string = '/client';

  ngOnInit(): void {
    this.regioniList = this.regioniView = this.comuniService.regioni;
    this.regioneFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterRegioni();
        if (this.regioneSelection != undefined) {
          this.getProvince(this.regioneSelection);
        }
      });

    this.provinciaFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterProvince();
        if (this.provinciaSelection != undefined) {
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
    var customReturnValue = this.route.snapshot.params.customReturn;
    if(customReturnValue != undefined){
      this.returnValue = customReturnValue;
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
        if (element.text.includes(search)) {
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
        if (element.text.includes(search)) {
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
        if (element.text.includes(search)) {
          this.comuniView.push(element);
        }
      });
    }
  }

  getProvince(value: any) {
    this.comuniService.getProvince(value).subscribe((data) => {
      var res = JSON.parse(data);
      res.forEach((element: { provincia: string; sigla: number; }) => {
        var f = new Enum(element.provincia, element.sigla);
        this.provinceList.push(f);
      });
      this.provinceView = this.provinceList;
    })
  }

  getComuni(value: any) {
    this.comuniService.getComuni(value).subscribe((data) => {
      var res = JSON.parse(data);
      res.forEach((element: { comune: string; cap: number; }) => {
        var f = new Enum(element.comune, element.cap);
        this.comuniList.push(f);
      });
      this.comuniView = this.comuniList;
    });
  }

  doUpdate() {
    var formData = this.form.getRawValue();
    console.log(formData);
    formData.clients_id = this.client.clients_id;
    formData.ccap = this.cap;
    // console.log(this.form);
    // Object.keys(this.form.controls).forEach(key => {
    //   console.log(this.form.controls[key].value);
    // });
    this.service.updateClient(formData).subscribe((data) => {
      if (data == true) {
        this.openSnackBar("Aggiornato con successo", "Ok");
      }
    });
  }

  openDialog(text: string): void {
    const dialogRef = this.dialog.open(ErrorPopupComponent, {
      width: '300px',
      data: { text: text },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "true") {
        this.doSave();
      }
    });
  }

  openSnackBar(message: string, actionMessage: string = 'Ok') {
    this.snackBarRef = this.snackBar.open(message, actionMessage, {
      duration: 3000,
    });
    this.snackBarRef.afterDismissed().subscribe(() => {
      this.clickBack();
    });
  }

  // getDataFromControls(){
  //   Object.keys(this.myForm.controls).forEach(key => {
  //     this.myForm.controls[key].markAsDirty();
  //   });
  // }

  clickSave() {
    if (this.form.valid) {
      if (this.isUpdate) {
        this.doUpdate();
      } else {
        this.trySave();
      }
    }
  }

  trySave() {
    var formData = this.form.getRawValue();
    this.service.getClient(formData.nome, formData.cognome, formData.telefono).subscribe((data) => {
      if (data != []) {
        console.log(data);
        if (data.length > 0) {
          this.openDialog("Utente gia esistente, continuare?");
        } else {
          this.doSave();
        }
      }
    });
  }

  doSave() {
    var formData = this.form.getRawValue();
    this.service.saveClient(formData).subscribe((data) => {
      this.openSnackBar("Salvato con successo", "Ok");
    });
  }

  clickBack() {
    this.router.navigate([this.returnValue]);
  }

  getFormData() {
    var clientData = new ClientSelectResults();
    // clientData.nome = this.nomeFormControl.value;
    // clientData.cognome = this.cognomeFormControl.value;

    // clientData.telefono = this.telefonoFormControl.value;
    // clientData.mail = this.emailFormControl.value;
    // clientData.via = this.viaFormControl.value;
    // clientData.civico = this.civicoFormControl.value;
    clientData.ccap = this.cap;

    return clientData;

  }

  loadData(id: any) {
    this.service.getClientById(id).subscribe((data) => {

      var res = JSON.parse(data)[0];
      this.client = res;
      this.isClientLoaded = true;

      this.form.setValue({
        nome: res.nome,
        cognome: res.cognome,
        telefono: res.telefono,
        mail: res.mail,
        via: res.via,
        civico: res.civico
      });

      this.cap = res.ccap;
      // this.nomeFormControl.setValue(res.nome);
      // this.cognomeFormControl.setValue(res.cognome);
      // this.telefonoFormControl.setValue(res.telefono);
      // this.emailFormControl.setValue(res.mail);
      // this.viaFormControl.setValue(res.via);
      // this.civicoFormControl.setValue(res.civico);


      if (res.cod_regione) {
        this.getProvince(res.cod_regione);
        this.regioneSelection = res.cod_regione;
      }
      if (res.sigla) {
        this.getComuni(res.sigla);
        this.provinciaSelection = res.sigla;
      }



    });
  }

}
