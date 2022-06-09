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
      { key: '_nome', title: 'Username' },
      { key: '_email', title: 'Email' },
      { key: 'permissionText', title: 'Ruolo' },
      { key: 'action', title: 'Azioni', cellTemplate: this.actionEdit },
    ];
    this.getData();
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
  }

  getData(): void {
    this.service.getClients().subscribe((data: any) => {
      var parsedData = JSON.parse(data);
      // parsedData.forEach((element: { permissionText: string; _permission: number; }) => {
      //   element.permissionText = this.enumService.getPermission(element._permission);
      // });
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
    this.router.navigate(['/client/edit', rowData._users_id]);
  }


}
