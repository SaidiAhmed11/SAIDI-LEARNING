import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Participation} from '../model/Participation';
import {Course} from '../model/Course';
import {CourseService} from './course.service';

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  urlParticipation :string="http://localhost:3000/participation"
  constructor(private httpClient:HttpClient,private courseService:CourseService) { }

  public addParticipation(participation: Participation): Observable<Participation>
  {
    return this.httpClient.post<Participation>(this.urlParticipation, participation, this.httpOptions);
  }

  getParticipationByUserCourse(idUser:number,idCourse:number) : Observable<Participation>
  {
    return this.httpClient.get<Participation>(this.urlParticipation+'/?idUser='+idUser+'&idCourse='+idCourse);
  }
  getParticipationById(id:number) : Observable<Participation>
  {
    return this.httpClient.get<Participation>(this.urlParticipation+'/'+id);
  }
  getParticipations() : Observable<Participation[]>
  {
    return this.httpClient.get<Participation[]>(this.urlParticipation);
  }



  deleteParticipation (participation: Participation | number): Observable<Participation>
  {
    const id = typeof participation === 'number' ? participation : participation.id;
    const url=this.urlParticipation+'/'+id;
    return this.httpClient.delete<Participation>(url);
  }

}
