import { Component, OnInit } from '@angular/core';
import {CourseService} from '../shared/course.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Course} from '../model/Course';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {
  listeCourses:Course[]=[];
  course:Course=new Course();
  fileToUpload: File = null;

  CourseForm:FormGroup;
  fbuilber:FormBuilder = new FormBuilder();
  constructor(private courseService : CourseService,private route:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.CourseForm = this.fbuilber.group({
      id:['',Validators.required],
      courseName:['',[Validators.required,Validators.minLength(5)]],
      seats:['',[Validators.required,Validators.pattern("[1-9][0-9]*")]],
      price:['',[Validators.required,Validators.pattern("[1-9][0-9]*")]],
      description:['',[Validators.required,Validators.minLength(20)]],
      category:['',Validators.required],
      image:['']
    })
    this.activatedRoute.paramMap.subscribe(next=>this.courseService.getCoursesByIdJson(+next.get('id')).
    subscribe(res=>this.course=res))
  }


  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  updateProduct()
  {
    this.courseService.updateProductwithimage(this.course.id,this.course,this.fileToUpload).subscribe(res=>this.route.navigateByUrl("/admin/courses"));
  }

}
