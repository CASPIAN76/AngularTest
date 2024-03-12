import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent  implements OnInit {
  roles:Array<any>=[];
  users:Array<User>=[];
  submited:boolean=false
   id:number=0

 addUserForm:FormGroup=new FormGroup({})


  constructor(private userService:UsersService, private fb:FormBuilder, private router:Router, private _activatedRoute:ActivatedRoute){
    this.id=Number(this._activatedRoute.snapshot.paramMap.get('id'))
    
  }



  ngOnInit(): void {
       this.roles= this.userService.getRoles(),
       this.users =this.userService.getUsers()

        this.addUserForm = this.fb.group({
          name:new FormControl( "",[Validators.required , Validators.minLength(3), Validators.maxLength(100)] ) ,
          email:new FormControl ("", [Validators.required, Validators.email]),
          role:new FormControl("",[Validators.required])
        }) 


        if(this.id >0){
            //  const data:any = this.users.find((userid)=>userid.id ===this.id)
            // this.addUserForm.patchValue(data)
            this.getByUserid()
        }
  }


  get validation(){
    return this.addUserForm.controls
  }

 getByUserid(){
  const data:any = this.users.find((userid)=>userid.id ===this.id)
  this.addUserForm.patchValue(data)
 }


  onSubmit(){
    if(this.addUserForm.invalid){
      this.submited=true;
      return
    }
    else{
      console.log({...this.addUserForm.value, id:this.users.length+1})
    this.userService.addUser({...this.addUserForm.value, id:this.users.length+1})
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    });
    this.router.navigate(['/userlist'])
    }
  }


  onUpdate(id:number){

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this.userService.onUpdateUser(id, this.addUserForm.value)
        this.router.navigate(['/userlist'])

        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
          this.getByUserid()
        Swal.fire("Changes are not saved", "", "info");
      }
    })
    
  }

}
