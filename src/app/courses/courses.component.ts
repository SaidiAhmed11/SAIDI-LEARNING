import { Component, OnInit } from '@angular/core';
import {Course} from '../model/Course';
import {CourseService} from '../shared/course.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  coursesList:Course[];
  searchCourses:Course[];
  constructor(private  coursesService:CourseService,private router:Router) { }

  ngOnInit(): void {
    this.coursesService.getCoursesJson().subscribe(res=>{this.searchCourses=this.coursesList=res});
  }

  LikeCourses(c: Course)
  {
    c.likes++;
    this.coursesService.updateCourse(c.id,c).subscribe(res=>res=>this.router.navigateByUrl("/elearning/courses"));

  }

  search(query : any){
    this.searchCourses = (query) ? this.coursesList.filter(course=>course.courseName.toLowerCase().includes(query.toLowerCase()) ||course.category.toLowerCase().includes(query.toLowerCase())) : this.coursesList;
  }


}
