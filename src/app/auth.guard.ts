import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    if (localStorage.getItem("id")==null){
      return true;
    }
    else
    {
      if(localStorage.getItem("role")=="Admin")
      {
        this.router.navigateByUrl("/admin")
      }
      else
      {this.router.navigateByUrl("/elearning/home")
       }
      return false;
    }


  }

}
