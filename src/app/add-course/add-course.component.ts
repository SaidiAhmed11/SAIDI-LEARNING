import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CourseService} from '../shared/course.service';
import {Course} from '../model/Course';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  course : Course = new Course();

  fileToUpload: File = null;
  constructor(private router: Router,private courseService:CourseService) { }

  ngOnInit(): void {
  }


  addCourse()
  {
    //this.course.image="iamge.jpg"
    this.course.mumbParticipants=0;
    this.course.likes=0;
    console.log(this.course)
    this.courseService.addCourse(this.course,this.fileToUpload).subscribe(res=>this.router.navigateByUrl("/admin/courses"));
    this.course=new Course();
  }

  Reset()
  {
    this.course=new Course();
  }


  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }



}
