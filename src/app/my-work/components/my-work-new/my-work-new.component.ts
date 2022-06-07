import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkOrderSelect } from 'src/app/common/models/work-order-select';
import { WorkOrderService } from 'src/app/_services/work-order.service';

@Component({
  selector: 'app-my-work-new',
  templateUrl: './my-work-new.component.html',
  styleUrls: ['./my-work-new.component.css']
})
export class MyWorkNewComponent implements OnInit {

  step: number = 0;

  workOrder = new WorkOrderSelect();

  nome: string;
  cognome: string;
  telefono: string;
  mail: string;
  riferimento: string;
  tipoOggetto: string;




  requiredFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.email]);
  telefonoFormControl = new FormControl('', [Validators.required, Validators.pattern('([0-9+ ]{8,17})')]);

  constructor(private service: WorkOrderService, private router: Router) { }

  ngOnInit(): void {
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
}
