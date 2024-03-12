import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UsersService } from '../users.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userslist: Array<User> = []


  constructor(private user: UsersService, private router :Router) { }

  ngOnInit(): void {
    this.userslist = this.user.getUsers()

    
  }



  deleteUser(id: number) {
    
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        this.user.deleteUser(id)
        Swal.fire({
          title: "Deleted!",
          text: "Your Record has been deleted.",
          icon: "success"
        });
      }
    });

  }



  updateRecord(id:number){
    this.router.navigate(['/updateUser', id])
  }

}
