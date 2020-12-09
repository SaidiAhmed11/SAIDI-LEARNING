import { Component, OnInit } from '@angular/core';
import {Course} from '../model/Course';
import {Participation} from '../model/Participation';
import {CourseService} from '../shared/course.service';
import {ParticipationService} from '../shared/participation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../model/User';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {
  usersList:User[]=[];
  participatedUsers:Participation[]=[];
  idCourse:number=0;
  constructor(private  coursesService:CourseService,private participationService:ParticipationService
              ,private router:Router,private activatedRoute:ActivatedRoute,
              private usersService:UserService) {

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(next=>{
        this.idCourse=+next.get('id')
        this.participationService.getParticipations().subscribe(res=>{
          this.participatedUsers=res
          for (let i in this.participatedUsers) {
            if (this.participatedUsers[i].idCourse == +next.get('id')) {
              this.usersService.getUserByIdJson(this.participatedUsers[i].idUser).subscribe(res=>this.usersList.push(res))
            }
          }
        });
    }
    );

  }

}
