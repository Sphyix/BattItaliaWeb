import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { map } from 'rxjs/operators';
import { UserSelectResults } from '../common/models/user-select-results';
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
    private router: Router ) { }

  ngOnInit(): void {
    this.columns = [
      { key: '_nome', title: 'Username' },
      { key: '_email', title: 'Email' },
      { key: '_permission', title: 'Ruolo' },
      { key: 'action', title: 'Actions', cellTemplate: this.actionEdit },
    ];
    this.getData();
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
  }

  getData(): void {
   this.service.getUsers().subscribe((data: any) => {
     this.tblData = JSON.parse(data);
  })
  }

  edit(rowIndex: number): void {
    var rowData = this.tblData.filter((_v, k) => k == rowIndex)[0];
    this.showDetail(rowData);
    console.log(rowData);
  }

  showDetail(rowData?: any): void {
    this.router.navigate(['/profile/edit', rowData._id ]);
  }

  addNew(){
    this.router.navigate(['/profile/edit']);
  }
}
