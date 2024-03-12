import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
  {path:'',redirectTo:'userlist' , pathMatch:'full'},
  {path:'userlist', component:UserListComponent},
  {path:'addUser', component:AddUserComponent},
  {path:'updateUser/:id', component:AddUserComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
