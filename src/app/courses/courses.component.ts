import { Component, OnInit } from '@angular/core';
import {Course} from '../model/Course';
import {CourseService} from '../shared/course.service';
import {Router} from '@angular/router';

declare var FB:any;
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  username:string=localStorage.getItem('username');
  coursesList:Course[];
  searchCourses:Course[];
  course:Course=new Course();


  constructor(private  coursesService:CourseService,private router:Router) { }

  ngOnInit(): void {
    this.coursesService.getCoursesJson().subscribe(res=>{this.searchCourses=this.coursesList=res});


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

  search(query : any){
    this.searchCourses = (query) ? this.coursesList.filter(course=>course.courseName.toLowerCase().includes(query.toLowerCase()) ||course.category.toLowerCase().includes(query.toLowerCase()) ||course.price.toString().toLowerCase().includes(query.toLowerCase()) ): this.coursesList;
  }

  logout()
  {
    localStorage.clear();
    FB.logout();
    this.router.navigateByUrl("/login")
  }
}
