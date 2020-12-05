import { Component, OnInit } from '@angular/core';
import {CourseService} from '../shared/course.service';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/Course';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  course:Course=new Course();
  constructor(private courseService:CourseService, private activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(res=>this.courseService.getCoursesByIdJson(+res.get('id'))
      .subscribe(next=>this.course=next));
  }

}
