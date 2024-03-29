import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/_services/users.service';
import { FormControl, Validators } from '@angular/forms';
import { UserSelectResults } from 'src/app/common/models/user-select-results';
import { Enum } from 'src/app/common/models/enum';
import { EnumService } from 'src/app/_services/enum.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router, private service: UsersService, private enumService: EnumService,
    private snackBar: MatSnackBar) { }

  email: string;
  nome: string;
  oldPsw: string;
  newPsw: string;
  repeatNewPsw: string;

  permissions = [] as Enum[];
  permission: number;
  isPasswordChange = false;
  isNew = false;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  userFormControl = new FormControl('', [Validators.required]);
  pswFormControl = new FormControl('', [Validators.required]);


  ngOnInit(): void {
    var id = this.route.snapshot.params.id;
    if (id != undefined) {
      this.loadUser(id);
    } else{
      this.isPasswordChange = true;
      this.isNew = true;
      this.permission = 0;
    }
    this.loadPerms();
  }

  loadUser(id: number) {
    this.service.getUser(id).subscribe(data => {
      this.nome = data.nome;
      this.email = data.email;
      this.permission = data.permission;
    })
  }

  loadPerms() {
    this.permissions = this.enumService.permissions;
  }

  backClick() {
    this.router.navigate(['/profile']);
  }

  saveClick() {
    if (this.isPasswordChange) {
      if (!this.onPswChange()) {
        this.openSnackBar('Errore sulla password');
        return;
      }
    }

    if (this.emailFormControl.valid && this.userFormControl.valid) {
      var newUser = {} as UserSelectResults;
      newUser.nome = this.nome;
      newUser.email = this.email;
      newUser.passwd = this.newPsw;
      newUser.permission = this.permission;
      this.service.saveUser(newUser).subscribe((data) => {
        if(data == true){
          this.openSnackBar("Utente salvato");
        } else{
          this.openSnackBar("Errore durante il salvataggio");
        }
      });
      
    } else{
      this.openSnackBar("Errore, ricontrollare tutti i campi");
    }
  }

  openSnackBar(message: string, actionMessage: string = 'Ok') {
    this.snackBar.open(message, actionMessage);
  }

  onPswChange(): boolean {
    if (this.newPsw == undefined || this.repeatNewPsw == undefined) {
      return false;
    }
    if (this.newPsw?.length < 8 || this.repeatNewPsw?.length < 8) {
      this.pswFormControl.setErrors({
        minLength: true
      });
      return false;
    }
    if (this.newPsw != this.repeatNewPsw) {
      this.pswFormControl.setErrors({
        notMatch: true
      });
      return false;
    }
    return true;
  }

}
