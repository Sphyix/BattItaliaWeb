import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { ClientSelectResults } from 'src/app/common/models/client-select-results';
import { WorkOrderSelectResults } from 'src/app/common/models/work-order-select-results';
import { ClientService } from 'src/app/_services/client.service';
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

  nome: string;
  cognome: string;
  telefono: string;
  mail: string;
  riferimento: string;
  tipoOggetto: string;

  tblData: any[];
  @ViewChild('actionEdit', { static: true }) actionEdit: TemplateRef<any>;
  public configuration: Config = { ...DefaultConfig };
  public columns: Columns[];


  requiredFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.email]);
  telefonoFormControl = new FormControl('', [Validators.required, Validators.pattern('([0-9+ ]{8,17})')]);

  constructor(private service: WorkOrderService, private router: Router, private clientService: ClientService) { }

  ngOnInit(): void {
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

  getClientData() {
    this.clientService.getClients().subscribe((data) => {
      this.tblData = JSON.parse(data);
      this.tblData.forEach(element => {
        element.residenza = element._via + element._civico + ", " + element._comune, ", " + element._regione;
      });
    })
  }

  getCurrentStep(currStep: number) {
    if(this.step == currStep){
      return true;
    }
    return false;
  }

  clickNext() {
    if(this.step != 3){
      this.step++;
    }
    else{
      //salva
    }
    
  }

  clickBack() {
    if(this.step > 0){
      this.step --;
    }
    else{
      this.router.navigate(['/mywork']);
    }
  }

  selectClient(rowIndex: any) {
    this.client = this.tblData[rowIndex];
    this.clickNext();
  }
}
