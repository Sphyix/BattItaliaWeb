import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { ClientService } from '../_services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private router: Router, private service: ClientService) { }

  tblData: any[];
  @ViewChild('actionEdit', { static: true }) actionEdit: TemplateRef<any>;
  public configuration: Config = { ...DefaultConfig };
  public columns: Columns[];

  ngOnInit(): void {
    this.columns = [
      { key: 'nome', title: 'Nome' },
      { key: 'cognome', title: 'Cognome' },
      { key: 'telefono', title: 'Telefono' },
      { key: 'mail', title: 'E-mail' },
      { key: 'indirizzoCompleto', title: 'Indirizzo' },
      { key: 'action', title: 'Azioni', cellTemplate: this.actionEdit },
    ];
    this.getData();
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
  }

  getData(): void {
    this.service.getClients().subscribe((data: any) => {
      var parsedData = JSON.parse(data);
      parsedData.forEach((element: { comune: string; sigla: string; regione: string; ccap: string; via: string; civico: string; indirizzoCompleto: string}) => {
        element.indirizzoCompleto = element.via + ' ' + element.civico + ', ' + element.comune + ', ' + element.ccap + ' ' + element.sigla + ' ' + element.regione
      });
      console.log(parsedData);
      this.tblData = parsedData;
    });
  }

  addNew() {
    this.router.navigate(['/client/edit']);
  }

  edit(rowIndex: number): void {
    var rowData = this.tblData.filter((_v, k) => k == rowIndex)[0];
    console.log(rowData);
    this.showDetail(rowData);
  }

  showDetail(rowData: any) {
    this.router.navigate(['/client/edit', rowData.clients_id]);
  }


}
