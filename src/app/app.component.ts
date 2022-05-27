import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenStorageService } from './_services/token-storage.service';
import { UsersService } from './_services/users.service';
import { EventBusService } from './_shared/event-bus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private roles?: number;
  private pagePerms = {} as any;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;


  eventBusSub?: Subscription;

  constructor(private tokenStorageService: TokenStorageService, private eventBusService: EventBusService, private router: Router, private userService: UsersService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles? this.roles >= 2 : false;
      this.showModeratorBoard = this.roles? this.roles >= 1 : false;

      this.username = user.userName;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });

    this.userService.getPagePermissions().subscribe((data: any) => {
      this.pagePerms = data;
    })
  }

  ngOnDestroy(): void {
    if (this.eventBusSub)
      this.eventBusSub.unsubscribe();
  }

  logout(): void {
    this.tokenStorageService.signOut();

    this.isLoggedIn = false;
    this.roles = undefined
    this.showAdminBoard = false;
    this.showModeratorBoard = false;
    window.location.reload();
    this.router.navigate(['/login']);
  }

  checkPermission(route: string): boolean {
    var res = false;
    if (this.pagePerms?.length > 0) {
      this.pagePerms.forEach((element: { _permission: number; _pageurl: string; }) => {
        if (this.roles? this.roles >= element._permission : false) {
          if (route == element._pageurl) {
            res = true;
          }
        }
      });
    }
    return res;

  }
}
