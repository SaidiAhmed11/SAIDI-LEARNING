import { Component, OnInit } from '@angular/core';
import {Course} from '../model/Course';
import {CourseService} from '../shared/course.service';
import {Router} from '@angular/router';
import {ParticipationService} from '../shared/participation.service';
import {Participation} from '../model/Participation';

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
        if (this.participatedUsers[i].idUser == 2) {
          this.coursesService.getCoursesByIdJson(this.participatedUsers[i].idCourse).subscribe(res=>this.coursesList.push(res))
        }
      }
    });
  }

  LikeCourses(c: Course)
  {
    c.likes++;
    this.coursesService.updateCourse(c.id,c).subscribe(res=>res=>this.router.navigateByUrl("/elearning/courses"));

  }
}
