import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClientSelectResults } from 'src/app/common/models/client-select-results';
import { Enum } from 'src/app/common/models/enum';
import { WorkOrderSelectResults } from 'src/app/common/models/work-order-select-results';
import { ClientService } from 'src/app/_services/client.service';
import { ComuniService } from 'src/app/_services/comuni.service';
import { EnumService } from 'src/app/_services/enum.service';
import { WorkOrderService } from 'src/app/_services/work-order.service';

@Component({
  selector: 'app-my-work-new',
  templateUrl: './my-work-new.component.html',
  styleUrls: ['./my-work-new.component.css']
})
export class MyWorkNewComponent implements OnInit {

  step: number = 0;

  workOrder = new WorkOrderSelectResults();
  client = new ClientSelectResults();

  isNewClient = false;

  public tipoOggetti: any;
  public difficolta: any;

  public regioniView = [] as Enum[];
  public regioniList = [] as Enum[];
  public provinceView = [] as Enum[];
  public provinceList = [] as Enum[];
  public comuniView = [] as Enum[];
  public comuniList = [] as Enum[];

  regioneSelection: any;
  provinciaSelection: any;

  tblData: any[];
  @ViewChild('actionEdit', { static: true }) actionEdit: TemplateRef<any>;
  public configuration: Config = { ...DefaultConfig };
  public columns: Columns[];


  requiredFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.email]);
  telefonoFormControl = new FormControl('', [Validators.required, Validators.pattern('([0-9+ ]{8,17})')]);
  regioneFilterCtrl: FormControl = new FormControl();
  provinciaFilterCtrl: FormControl = new FormControl();
  comuneFilterCtrl: FormControl = new FormControl();

  protected _onDestroy = new Subject();
  constructor(private service: WorkOrderService, private router: Router, private clientService: ClientService,
    private enumService: EnumService, private comuniService: ComuniService) { }

  ngOnInit(): void {

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

    this.tipoOggetti = this.enumService.tipoOggetti;
    this.difficolta = this.enumService.difficolta;
    this.columns = [
      { key: '_nome', title: 'Nome' },
      { key: '_cognome', title: 'Cognome' },
      { key: '_telefono', title: 'Telefono' },
      { key: '_mail', title: 'Email' },
      { key: 'residenza', title: 'Residenza' },
      { key: 'action', title: 'Azioni', cellTemplate: this.actionEdit },
    ];
    this.getClientData();
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
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

  getClientData() {
    this.clientService.getClients().subscribe((data) => {
      this.tblData = JSON.parse(data);
      this.tblData.forEach(element => {
        element.residenza = element._via + ' ' + element._civico + ", " + element._comune;
      });
    })
  }

  getCurrentStep(currStep: number) {
    if (this.step == currStep) {
      return true;
    }
    return false;
  }

  clickNext() {
    if (this.step != 3) {
      this.step++;
    }
    else {
      //salva
    }

  }

  clickBack() {
    if (this.step > 0) {
      this.step--;
    }
    else {
      this.router.navigate(['/mywork']);
    }
  }

  selectClient(rowIndex: any) {
    this.client = this.tblData[rowIndex];
    this.clickNext();
  }

  editClient(rowIndex: any) {
    
    //@@@@@@@@@@@@@ GOTO edit client
  }
}
