import { Component, OnInit } from '@angular/core';
import {CourseService} from '../shared/course.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Course} from '../model/Course';
import {Participation} from '../model/Participation';
import {ParticipationService} from '../shared/participation.service';
import { ToastrManager } from 'ng6-toastr-notifications';


declare var FB:any;
@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {
  username:string=localStorage.getItem('username');
  course:Course=new Course();
  participation:Participation=new Participation();

  constructor(private  coursesService:CourseService,private router:Router,
    private activatedRoute:ActivatedRoute,private participationService:ParticipationService,
              private toastr: ToastrManager) { }

  ngOnInit(): void {

  this.activatedRoute.paramMap.subscribe(res=>this.coursesService.getCoursesByIdJson(+res.get('id'))
    .subscribe(res=>this.course=res));





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

  Participate()
  {
    this.course.mumbParticipants++;

    this.participation.idUser=+localStorage.getItem("id");
    this.participation.idCourse=this.course.id;
    this.participation.courseName=this.course.courseName;
    this.participation.description=this.course.description;
    this.participation.image=this.course.image;
    this.participation.category=this.course.category;


    this.participationService.addParticipation(this.participation).subscribe(res=>this.coursesService.updateCourse(this.course.id,this.course)
      .subscribe(next=>this.participationService.getParticipations()
        .subscribe(next=>this.router.navigateByUrl('/elearning/courses'))));
    this.toastr.successToastr('You can check your courses now', 'Congratulations!');
    this.participation = new Participation();
  }


  logout()
  {
    localStorage.clear();
    FB.logout();
    this.router.navigateByUrl("/login")
  }

}
