import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/_services/users.service';
import {FormControl, Validators} from '@angular/forms';
import { UserSelectResults } from 'src/app/common/models/user-select-results';
import { Enum } from 'src/app/common/models/enum';
import { EnumService } from 'src/app/_services/enum.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router, private service: UsersService, private enumService: EnumService) { }

    permissions = [] as Enum[];

    email: string = '';
    nome: string = '';

    permission: string;

    isPasswordChange = false;

    oldPsw: string;
    newPsw: string;
    repeatNewPsw: string;


  ngOnInit(): void {
    var id = this.route.snapshot.params.id;
    if(id != undefined){
      this.loadUser(id);
      this.loadPerms();
    }
  }

  loadUser(id: number){
    this.service.getUser(id).subscribe(data => {
      this.nome = data._nome;
      this.email = data._email;
      this.permission = data._permission;
    })
  }

  loadPerms(){
    this.enumService.getPermissions().subscribe(data => {
      var res = JSON.parse(data);
      console.log(res);
      res.forEach((element: { _permission: string; _id: number; }) => {
        var f = new Enum(element._permission, element._id);
        this.permissions.push(f);
      });
    })
  }

  backClick(){
    this.router.navigate(['/profile']);
  }

  saveClick(){
    if(this.isPasswordChange){
      if(this.newPsw != this.repeatNewPsw){
        //errore
      }

      
    }
  }

}
