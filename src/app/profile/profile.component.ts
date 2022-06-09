import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { map } from 'rxjs/operators';
import { UserSelectResults } from '../common/models/user-select-results';
import { EnumService } from '../_services/enum.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UsersService } from '../_services/users.service';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  tblData: UserSelectResults[];
  @ViewChild('actionEdit', { static: true }) actionEdit: TemplateRef<any>;
  public configuration: Config = { ...DefaultConfig };
  public columns: Columns[];

  constructor(private token: TokenStorageService, private service: UsersService, private route: ActivatedRoute,
    private router: Router, public enumService: EnumService) { }

  ngOnInit(): void {
    this.columns = [
      { key: 'nome', title: 'Username' },
      { key: 'email', title: 'Email' },
      { key: 'permissionText', title: 'Ruolo' },
      { key: 'action', title: 'Azioni', cellTemplate: this.actionEdit },
    ];
    this.getData();
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
  }

  getData(): void {
    this.service.getUsers().subscribe((data: any) => {
      var parsedData = JSON.parse(data);
      parsedData.forEach((element: { permissionText: string; permission: number; }) => {
        element.permissionText = this.enumService.getPermission(element.permission);
      });
      console.log(parsedData);
      this.tblData = parsedData;
      console.log(this.tblData);
    });
  }

  edit(rowIndex: number): void {
    var rowData = this.tblData.filter((_v, k) => k == rowIndex)[0];
    this.showDetail(rowData);
    console.log(rowData);
  }

  showDetail(rowData?: any): void {
    console.log(rowData);
    this.router.navigate(['/profile/edit', rowData.users_id]);
  }

  addNew() {
    this.router.navigate(['/profile/edit']);
  }

}
