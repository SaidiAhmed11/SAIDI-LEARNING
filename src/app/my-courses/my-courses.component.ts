import { Component, OnInit } from '@angular/core';
import {Course} from '../model/Course';
import {CourseService} from '../shared/course.service';
import {Router} from '@angular/router';
import {ParticipationService} from '../shared/participation.service';
import {Participation} from '../model/Participation';


declare var FB:any;
@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {
  coursesList:Course[]=[];
  participatedUsers:Participation[]=[];
  constructor(private  coursesService:CourseService,private participationService:ParticipationService,private router:Router) {

  }

  ngOnInit(): void {

    this.participationService.getParticipations().subscribe(res=>{
      this.participatedUsers=res
      for (let i in this.participatedUsers) {
        if (this.participatedUsers[i].idUser == +localStorage.getItem("id")) {
          this.coursesService.getCoursesByIdJson(this.participatedUsers[i].idCourse).subscribe(res=>this.coursesList.push(res))
        }
      }
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

  LikeCourses(c: Course)
  {
    c.likes++;
    this.coursesService.updateCourse(c.id,c).subscribe(res=>res=>this.router.navigateByUrl("/elearning/courses"));

  }

  logout()
  {
    localStorage.clear();
    FB.logout();
    this.router.navigateByUrl("/login")
  }
}
