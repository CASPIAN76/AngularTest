
import { Injectable } from '@angular/core';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  roles=["Angular Developer" , "ReactJS Developer" , "VueJS Developer"]
  constructor() { }

  usersList: Array<User> = [
    { id: 1, name: "Nilesh", email: "nilesh@gmail.com", role: "Angular Developer" },
    { id: 2, name: "Kartik", email: "pvr@gmail.com", role: "ReactJS Developer" },
  ]


// for userlist
  getUsers() {
    return this.usersList
  }


  // for ROLES
  getRoles(){
    return this.roles
  }


  //for add user
  addUser(body:User){
  this.usersList.push(body)
  }
 

  //for deleteuser by id
 deleteUser(id:number){
 
  this.usersList.splice(id, 1)
 
 }

 onUpdateUser(id:number, value:any){
  const indexValue=  this.usersList.findIndex((userData)=>userData.id ===id)
  this.usersList[indexValue] ={...value, id:id}
 }

}
