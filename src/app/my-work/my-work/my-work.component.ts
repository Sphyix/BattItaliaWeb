import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { WorkOrderSelectResults } from 'src/app/common/models/work-order-select-results';
import { WorkOrderService } from 'src/app/_services/work-order.service';



@Component({
  selector: 'app-my-work',
  templateUrl: './my-work.component.html',
  styleUrls: ['./my-work.component.css']
})
export class MyWorkComponent implements OnInit {

  tblData: WorkOrderSelectResults[];
  @ViewChild('actionEdit', { static: true }) actionEdit: TemplateRef<any>;
  @ViewChild('difficoltaCircle', { static: true }) difficoltaCircle: TemplateRef<any>;
  @ViewChild('difettoFisso', { static: true }) difettoFisso: TemplateRef<any>;
  
  public configuration: Config = { ...DefaultConfig };
  public columns = [] as Columns[];

  constructor(private service: WorkOrderService, private router: Router) { }

  ngOnInit(): void {
    this.columns = [
      
      { key: 'modello', title: 'Modello' },
      { key: 'permission', title: 'Ruolo' },
      { key: 'difficolta', title: 'Difficoltà', cellTemplate: this.difficoltaCircle },
      { key: 'difettofisso', title: 'Difetto Fisso', cellTemplate: this.difettoFisso },
      { key: 'nome', title: 'Operatore' },
      { key: 'action', title: 'Azioni', cellTemplate: this.actionEdit },
      
    ];
    this.getData();
    this.configuration.searchEnabled = true;
  }

  getData(): void {
    this.service.getWorkOrders().subscribe((data: any) => {
      this.tblData = JSON.parse(data);
   })
   }

   assign(rowIndex: number) {

   }

   isRowAssigned(rowIndex: number){
     
   }

   edit(rowIndex: number): void {
    var rowData = this.tblData.filter((_v, k) => k == rowIndex)[0];
    this.showDetail(rowData);
  }

  showDetail(rowData?: any): void {
    this.router.navigate(['/mywork/edit', rowData.workOrders_id ]);
  }

  getDifficultyColor(difficolta: number){
    if(difficolta == 2){
      return 'red';
    }
    if(difficolta == 1){
      return 'yellow';
    }
    return 'green';
  }

  addNew() {
    this.router.navigate(['/mywork/new']);
  }

}
