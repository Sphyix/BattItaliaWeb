import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { AuthGuardService as AuthGuard } from './_services/auth.guard';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { MyWorkComponent } from './my-work/my-work/my-work.component';
import { MyWorkEditComponent } from './my-work/components/my-work-edit/my-work-edit.component';
import { MyWorkNewComponent } from './my-work/components/my-work-new/my-work-new.component';
import { ClientComponent } from './client/client.component';
import { ClientEditComponent } from './client/client-edit/client-edit.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, runGuardsAndResolvers: 'always' },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'mod', component: BoardModeratorComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: BoardAdminComponent, canActivate: [AuthGuard] },
  { path: 'mywork', component: MyWorkComponent, canActivate: [AuthGuard] },
  { path: 'client', component: ClientComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  //details
  { path: 'profile/edit/:id', component: ProfileEditComponent, canActivate: [AuthGuard] },
  { path: 'profile/edit', component: ProfileEditComponent, canActivate: [AuthGuard] },
  { path: 'mywork/edit/:id', component: MyWorkEditComponent, canActivate: [AuthGuard] },
  { path: 'mywork/new', component: MyWorkNewComponent, canActivate: [AuthGuard] },
  { path: 'client/edit/:id', component: ClientEditComponent, canActivate: [AuthGuard] },
  { path: 'client/edit', component: ClientEditComponent, canActivate: [AuthGuard] },


  
  //user
  // {
  //   path: 'user', component: BoardUserComponent, canActivate: [AuthGuard],
  //   children: [
  //     { path: '', component:  },
  //     { path: , component:  },
  //   ]
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
