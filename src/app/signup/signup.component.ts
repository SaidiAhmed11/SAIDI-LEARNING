import { Component, OnInit } from '@angular/core';
import {User} from '../model/User';
import {UserService} from '../shared/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user:User= new User();
  users:User[]=[];
  fileToUpload: File = null;
  confirmPassword:string="";
  idExist:boolean=false;
  usernameExist:boolean=false;
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.userService.getUsersJson().subscribe(res=>{
      this.users=res;
      for(let i in this.users)
      {
        if(this.user.id==this.users[i].id)
        {
         this.idExist=true;
        }
        else if (this.user.username==this.users[i].username)
        {
          this.usernameExist=true;

        }
      }
    });
  }

addUser()
{
  this.user.logged=false;
  this.user.role="User";
  this.user.img=this.fileToUpload.name;
  this.userService.addUser(this.user).subscribe(next=>this.router.navigateByUrl('/login'));
  this.user=new User();
}

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }


  verify(id:number)
  {
    this.userService.getUsersJson().subscribe(res=>{
      this.users=res;
      for(let i in this.users)
      {
        if(id==this.users[i].id)
        {
          this.idExist=true;
          console.log("true");
        }
      }
    });
  }

}
