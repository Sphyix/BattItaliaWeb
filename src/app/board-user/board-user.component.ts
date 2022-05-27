import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { EventBusService } from '../_shared/event-bus.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private userService: UserService, private eventBusService: EventBusService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sidenav.mode = 'side';
        this.sidenav.open();
    // this.userService.getUserBoard().subscribe(
    //   data => {
    //     this.content = data;
    //   },
    //   err => {
    //     this.content = err.error.message || err.error || err.message;

    //     if (err.status === 403)
    //       this.eventBusService.emit(new EventData('logout', null));
    //   }
    // );
  }

}
