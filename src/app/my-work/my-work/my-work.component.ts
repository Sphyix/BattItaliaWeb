import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { WorkOrderSelect } from 'src/app/common/models/work-order-select';
import { WorkOrderService } from 'src/app/_services/work-order.service';



@Component({
  selector: 'app-my-work',
  templateUrl: './my-work.component.html',
  styleUrls: ['./my-work.component.css']
})
export class MyWorkComponent implements OnInit {

  tblData: WorkOrderSelect[];
  @ViewChild('actionEdit', { static: true }) actionEdit: TemplateRef<any>;
  @ViewChild('difficoltaCircle', { static: true }) difficoltaCircle: TemplateRef<any>;
  @ViewChild('difettoFisso', { static: true }) difettoFisso: TemplateRef<any>;
  
  public configuration: Config = { ...DefaultConfig };
  public columns = [] as Columns[];

  constructor(private service: WorkOrderService, private router: Router) { }

  ngOnInit(): void {
    this.columns = [
      
      { key: '_modello', title: 'Modello' },
      { key: '_permission', title: 'Ruolo' },
      { key: 'difficolta', title: 'Difficoltà', cellTemplate: this.difficoltaCircle },
      { key: 'difettofisso', title: 'Difetto Fisso', cellTemplate: this.difettoFisso },
      { key: '_nome', title: 'Operatore' },
      { key: 'action', title: 'Actions', cellTemplate: this.actionEdit },
      
    ];
    this.getData();
    this.configuration.searchEnabled = true;
  }

  getData(): void {
    this.service.getWorkOrders().subscribe((data: any) => {
      this.tblData = JSON.parse(data);
      console.log(this.tblData);
   })
   }

   edit(rowIndex: number): void {
    var rowData = this.tblData.filter((_v, k) => k == rowIndex)[0];
    this.showDetail(rowData);
    console.log(rowData);
  }

  showDetail(rowData?: any): void {
    this.router.navigate(['/mywork/edit', rowData._id ]);
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
