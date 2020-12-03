import { Component, OnInit } from '@angular/core';
import {CourseService} from '../shared/course.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Course} from '../model/Course';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {
  listeCourses:Course[]=[];
  course:Course=new Course();

  CourseForm:FormGroup;
  fbuilber:FormBuilder = new FormBuilder();
  constructor(private courseService : CourseService,private route:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {



    this.activatedRoute.paramMap.subscribe(next=>this.courseService.getCoursesByIdJson(+next.get('id')).
    subscribe(res=>this.course=res))
  }

}
