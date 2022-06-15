import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnumService } from 'src/app/_services/enum.service';
import { WorkOrderService } from 'src/app/_services/work-order.service';

@Component({
  selector: 'app-my-work-edit',
  templateUrl: './my-work-edit.component.html',
  styleUrls: ['./my-work-edit.component.css']
})
export class MyWorkEditComponent implements OnInit {

  constructor(private service: WorkOrderService, private route: ActivatedRoute, private enumService: EnumService) { }

  workOrderData: any;

  ngOnInit(): void {
    var id = this.route.snapshot.params.id;
    if (id != undefined) {
      this.loadData(id);
    }
  }


  loadData(id: number) {
    this.service.getWorkOrder(id).subscribe((data) => {
      this.workOrderData = data[0];
      this.workOrderData.tipoOggettoText = this.enumService.getTipoOggetto(this.workOrderData.tipoOggetto);
      this.workOrderData.statoText = this.enumService.getTipoOggetto(this.workOrderData.stato);
    });
  }

}
