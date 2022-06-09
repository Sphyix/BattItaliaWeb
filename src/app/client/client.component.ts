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
      { key: '_nome', title: 'Nome' },
      { key: '_cognome', title: 'Cognome' },
      { key: '_telefono', title: 'Telefono' },
      { key: '_mail', title: 'E-mail' },
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
      parsedData.forEach((element: { _comune: string; _sigla: string; _regione: string; _ccap: string; _via: string; _civico: string; indirizzoCompleto: string}) => {
        element.indirizzoCompleto = element._via + ' ' + element._civico + ', ' + element._comune + ', ' + element._ccap + ' ' + element._sigla + ' ' + element._regione
      });
      console.log(parsedData);
      this.tblData = parsedData;
    });
  }

  addNew() {

  }

  edit(rowIndex: number): void {
    var rowData = this.tblData.filter((_v, k) => k == rowIndex)[0];
    console.log(rowData);
    this.showDetail(rowData);
  }

  showDetail(rowData: any) {
    this.router.navigate(['/client/edit', rowData._clients_id]);
  }


}
