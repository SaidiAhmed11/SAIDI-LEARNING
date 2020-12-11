import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../shared/user.service';
import {ParticipationService} from '../shared/participation.service';
import {User} from '../model/User';
declare var FB:any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username:string=localStorage.getItem('username');
  user:User=new User();
  numbParticipations:number=0;
  constructor(private router:Router,private userService:UserService,private participationService:ParticipationService) { }

  ngOnInit(): void {

    this.userService.getUserByIdJson(+localStorage.getItem('id')).subscribe(res=>{
      this.user=res;
      this.participationService.getParticipations().subscribe(res=>
      {

        for (let i in res) {
          if (res[i].idUser == +localStorage.getItem('id')) {
          this.numbParticipations++;
          }
        }
      })
    });

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



  logout()
  {
    localStorage.clear();
    FB.logout();
    this.router.navigateByUrl("/login")
  }

}
