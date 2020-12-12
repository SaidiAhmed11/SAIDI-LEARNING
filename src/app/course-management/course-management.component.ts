import { Component, OnInit } from '@angular/core';
import {Course} from '../model/Course';
import {CourseService} from '../shared/course.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css']
})
export class CourseManagementComponent implements OnInit {
  coursesList:Course[];
  searchCourses:Course[];
  constructor(private  coursesService:CourseService,private router:Router) { }

  ngOnInit(): void {
    this.coursesService.getCoursesJson().subscribe(res=>{this.searchCourses=this.coursesList=res});
  }


  search(query : any){
    this.searchCourses = (query) ? this.coursesList.filter(course=>course.courseName.toLowerCase().includes(query.toLowerCase()) ||course.category.toLowerCase().includes(query.toLowerCase()) ) : this.coursesList;
  }

  delete(c : Course)
  {
    this.coursesService.deleteCourse(c).subscribe(next=>this.coursesService.getCoursesJson().subscribe(next=>this.searchCourses=next));
  }

  CourseSeatsColor(availableSeats:number)
  {
    if (availableSeats== 0)
    {
      return "red";
    }
    else
      return "black";

  }

  CourseSeatFontSize(availableSeats:number)
  {
    if (availableSeats == 0)
    {
      return "22px";
    }
    else
      return "14px";

  }

  CourseSeatFontSizeNgStyle(availableSeats:number)
  {
    if (availableSeats == 0)
    {
      return "{'font-size' : '25px'}";
    }
    else
      return "{'font-size' : '30px'}";

  }

}
