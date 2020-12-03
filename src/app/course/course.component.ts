import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from '../model/Course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  @Input() course:Course;
  @Output() like = new EventEmitter<Course>();
  constructor() { }

  ngOnInit(): void {
  }
  sendlike()
  {
    this.like.emit(this.course);
  }

}
