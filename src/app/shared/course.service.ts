import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Course} from '../model/Course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  urlCourse :string="http://localhost:3000/courses"
  constructor(private httpClient:HttpClient) { }

  getCoursesJson() : Observable<Course[]>
  {
    return this.httpClient.get<Course[]>(this.urlCourse);
  }
  getCoursesByIdJson(id:number) : Observable<Course>
  {
    return this.httpClient.get<Course>(this.urlCourse+'/'+id);
  }

  public addCourse(course: Course,fileToUpload: File): Observable<Course>
  {
    course.image=fileToUpload.name;
    return this.httpClient.post<Course>(this.urlCourse, course, this.httpOptions);
  }

  deleteProduct (course: Course | number): Observable<Course>
  {
    const id = typeof course === 'number' ? course : course.id;
    const url=this.urlCourse+'/'+id;
    return this.httpClient.delete<Course>(url);
  }

  updateProduct(id :number,course : Course) : Observable<Course>
  {
    return this.httpClient.put<Course>(this.urlCourse+'/'+id ,course,this.httpOptions);
  }

}
