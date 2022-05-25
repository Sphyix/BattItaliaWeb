import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public tokenStorageService: TokenStorageService, public router: Router) {}

  isLoggedIn = false;
  
  canActivate(): boolean {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (!this.isLoggedIn) {
      this.router.navigate(['login']);
      this.tokenStorageService.signOut();
      return false;
    }
    return true;
  }
}