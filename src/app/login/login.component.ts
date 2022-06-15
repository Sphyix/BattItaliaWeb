import { Component, OnInit } from '@angular/core';
import { Enum } from '../common/models/enum';
import { AuthService } from '../_services/auth.service';
import { EnumService } from '../_services/enum.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: number;
  utente: string = "";

  roleText: string = "";

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private enumService: EnumService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.utente = this.tokenStorage.getUser().userName;
      this.enumService.loadUserPermissions().pipe().subscribe(() => {
          this.roleText = this.enumService.getPermission(this.roles);
      });
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.access_token);
        this.tokenStorage.saveRefreshToken(data.refreshToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        console.log(err);
        this.errorMessage = err.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
