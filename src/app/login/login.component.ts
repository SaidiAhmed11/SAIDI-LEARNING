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

  }

  login()
  {
    this.userService.login(this.user.username,this.user.password).subscribe(res=>this.userTest=res);
    if(this.userTest==null)
    {
      this.router.navigateByUrl("/login");
    }
    else
      if(this.userTest.role=="Admin")
        {
          this.router.navigateByUrl("/admin");

      }
  }

}
