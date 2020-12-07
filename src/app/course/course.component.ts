import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from '../model/Course';
import {Participation} from '../model/Participation';
import {ParticipationService} from '../shared/participation.service';
import {CourseService} from '../shared/course.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  @Input() course:Course;
  @Output() like = new EventEmitter<Course>();
  participation:Participation= new Participation();
  participatedUsers:Participation[]=[];
  participated:boolean=false;

  constructor(private courseService: CourseService,private participationService:ParticipationService) { }

  ngOnInit(): void {
    this.participationService.getParticipations().
    subscribe(res=>{
      this.participatedUsers=res
      for (let i in this.participatedUsers) {
        if (this.participatedUsers[i].idCourse == this.course.id && this.participatedUsers[i].idUser == 2) {
          this.participated=true;
        }
      }
    });

  }
  sendlike()
  {
    this.like.emit(this.course);
  }


  Participate()
  {
    this.course.mumbParticipants++;

    this.participation.idUser=2;
    this.participation.idCourse=this.course.id;
    this.participation.courseName=this.course.courseName;
    this.participation.description=this.course.description;
    this.participation.image=this.course.image;
    this.participation.category=this.course.category;

    this.participated=true;
    this.participationService.addParticipation(this.participation).subscribe(res=>this.courseService.updateCourse(this.course.id,this.course).subscribe(next=>this.participationService.getParticipations().subscribe(res=>this.participatedUsers=res)));

    this.participation = new Participation();
  }

  Cancel()
  {
    for (let i in this.participatedUsers) {
      if(this.participatedUsers[i].idCourse==this.course.id && this.participatedUsers[i].idUser==2)
      {
        this.participation=this.participatedUsers[i];
      }
    }
    console.log(this.participation);
    this.participated=false;
    this.course.mumbParticipants--;
    this.participationService.deleteParticipation(this.participation).subscribe(res=>this.courseService.updateCourse(this.course.id,this.course).subscribe(next=>this.participationService.getParticipations().subscribe(res=>this.participatedUsers=res)));

  }

}
