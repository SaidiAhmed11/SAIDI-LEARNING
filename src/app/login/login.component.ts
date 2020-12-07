import {Component, OnInit} from '@angular/core';
import {User} from '../model/User';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../shared/user.service';
import {Role} from '../model/Role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User= new User();
  userTest:User=new User();
  showAlert=false;

  constructor( private route: ActivatedRoute,
               private router: Router,
               private userService : UserService)
  {

  }

  ngOnInit(): void {
    // redirect to home if already logged in

    /*this.userService.userLoggedIn().subscribe(res=> {
        if (res != null) {

          if (res.role ===Role.Admin) {
            console.log(res);
            this.router.navigate(['/admin']);
          } else if (res.role==Role.User) {
            this.router.navigateByUrl("/home");
          }
        } else if(res==null){
          console.log("tiwa");
          this.router.navigateByUrl("/login");

        }
      }
    );*/
    if (localStorage.getItem("id")==null){
      this.router.navigateByUrl("/login")
    }
    else
    {
      if(localStorage.getItem("role")=="Admin")
      {
        this.router.navigateByUrl("/admin")

      }
      else if(localStorage.getItem("role")=="User")
      {this.router.navigateByUrl("/elearning/home")
       }

    }

  }

  login()
  {
   /* this.userService.login(this.user.username,this.user.password).subscribe(res=>this.userTest=res);
    if(this.userTest==null)
    {
      this.router.navigateByUrl("/login");
    }
    else
      if(this.userTest.role=="Admin")
        {
          this.router.navigateByUrl("/admin");

      }*/

    this.userService.getUsersJson().subscribe(res=>{
      for(let i in res)
      {
        if(this.user.username==res[i].username && this.user.password == res[i].password && res[i].role=="Admin")
        {

            localStorage.setItem('id',res[i].id.toString());
            localStorage.setItem('role',this.user.role);
            console.log("admin");
            this.router.navigateByUrl("/admin");

          }
          else if (this.user.username==res[i].username && this.user.password == res[i].password && res[i].role=="User")
          {
            localStorage.setItem('id',res[i].id.toString());
            localStorage.setItem('role',this.user.role);
            console.log("user");
            this.router.navigateByUrl("/elearning/home");
          }
        else {
          this.showAlert=true;

        }
      }

    });


  }

}
