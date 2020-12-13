import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
declare var FB:any;
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  username:string=localStorage.getItem('username');
  constructor(private router:Router) { }

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

  logout()
  {
    localStorage.clear();
    FB.logout();
    this.router.navigateByUrl("/login")
  }

}
