import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClientEditComponent } from 'src/app/client/client-edit/client-edit.component';
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

  images: any;

  infoBase = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    cognome: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.email]),
    telefono: new FormControl('', [Validators.required, Validators.pattern('([0-9+ ]{8,17})')]),
    via: new FormControl(),
    civico: new FormControl(),
  });

  workOrder = new WorkOrderSelectResults();
  client = new ClientSelectResults();

  isNewClient = false;

  @ViewChild('clientEdit') clientEdit: ClientEditComponent;

  public tipoOggetti: any;
  public difficolta: any;

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
    private enumService: EnumService) { }

  ngOnInit(): void {

    this.tipoOggetti = this.enumService.tipoOggetti;
    this.difficolta = this.enumService.difficolta;
    this.columns = [
      { key: 'nome', title: 'Nome' },
      { key: 'cognome', title: 'Cognome' },
      { key: 'telefono', title: 'Telefono' },
      { key: 'mail', title: 'Email' },
      { key: 'residenza', title: 'Residenza' },
      { key: 'action', title: 'Azioni', cellTemplate: this.actionEdit },
    ];
    this.getClientData();
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
  }

  getClientData() {
    this.clientService.getClients().subscribe((data) => {
      this.tblData = JSON.parse(data);
      this.tblData.forEach(element => {
        element.residenza = element.via + ' ' + element.civico + ", " + element.comune;
        var regex = new RegExp('null,? ?');
        while(element.residenza.includes('null')){
          element.residenza = element.residenza.replace(regex, ' ');
        }
      });
    })
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        this.images = [{}];
        this.images.pop();
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
   
                reader.onload = (readerEvent:any) => {
                   this.images.push(readerEvent.currentTarget.result); 
                }
  
                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }

  getCurrentStep(currStep: number) {
    if (this.step == currStep) {
      return true;
    }
    return false;
  }

  clickNext() {
    switch (this.step) {
      case 0:
        if(this.isNewClient) {
          this.client = this.clientEdit.client;
        }
        break;
      case 3:
        //salva
        break;

      default:
        break;
    }
    
    if (this.step != 3) {
      this.step++;
    }
    else {
      //salva
    }
  }

  clickBack() {
    switch (this.step) {
      case 2:
        this.images = [{}];
        this.images.pop();
        break;
      case 3:
        //salva
        break;

      default:
        break;
      }
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
    var row = this.tblData[rowIndex];
    this.router.navigate(['/client/edit', {id: row.clients_id, customReturn: 'mywork/new'}]);
  }
}
