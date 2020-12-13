import {Component, OnInit} from '@angular/core';
import {User} from '../model/User';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../shared/user.service';
import { ToastrManager } from 'ng6-toastr-notifications';

declare var FB:any;
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
               private userService : UserService,
               private toastr: ToastrManager)
  {

  }

  ngOnInit(): void {
    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : '202529791361200',
        cookie     : true,
        xfbml      : true,
        version    : 'v9.0'
      });

      FB.AppEvents.logPageView();

    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));


  }

  login()
  {
    this.userService.getUsersJson().subscribe(res=>{
      for(let i in res)
      {
        if(this.user.username==res[i].username && this.user.password == res[i].password && res[i].role=="Admin")
        {

            localStorage.setItem('id',res[i].id.toString());
            localStorage.setItem('role',this.user.role);
            localStorage.setItem('username',this.user.username);
            console.log("admin");
            this.showAlert=false;
            this.toastr.successToastr('Logged in', 'Success!');
            this.router.navigateByUrl("/admin/home");

          }
          else if (this.user.username==res[i].username && this.user.password == res[i].password && res[i].role=="User")
          {
            localStorage.setItem('id',res[i].id.toString());
            localStorage.setItem('role',this.user.role);
            localStorage.setItem('username',res[i].firstname);
            console.log("user");
            this.showAlert=false;
            this.toastr.successToastr('Logged in', 'Success!');
            this.router.navigateByUrl("/elearning/home");
          }
        else {
          this.showAlert=true;
        }
      }


    });
  }


  submitLogin(){
    FB.login((response)=>
    {
      if (response.authResponse)
      {

        this.userService.getUserByIdJson(response.authResponse.userID).subscribe(res=>
        {
          this.user=res;
          localStorage.setItem('id',response.authResponse.userID);
          localStorage.setItem('role',this.user.role);
          localStorage.setItem('username',this.user.username);
        });

        this.router.navigateByUrl("/elearning/home");
      }
      else
      {
        this.showAlert=true;
      }
    });

  }

}
