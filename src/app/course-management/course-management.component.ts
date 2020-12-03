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
    this.searchCourses = (query) ? this.coursesList.filter(course=>course.courseName.toLowerCase().includes(query.toLowerCase()) ||course.category.toLowerCase().includes(query.toLowerCase())) : this.coursesList;
  }

  delete(c : Course)
  {
    this.coursesService.deleteProduct(c).subscribe(next=>this.coursesService.getCoursesJson().subscribe(next=>this.searchCourses=next));
  }


}
