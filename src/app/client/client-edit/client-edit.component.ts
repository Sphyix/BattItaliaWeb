import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    var id = this.route.snapshot.params.id;
    if (id != undefined) {
      this.loadData(id);
    }
  }

  loadData(id: any){
    
  }

}
