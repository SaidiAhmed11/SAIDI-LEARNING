import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {User} from '../model/User';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlUsers:string="http://localhost:3000/users";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient : HttpClient) { }

  getUsers() : Observable<User[]>
  {
    return  this.httpClient.get<User[]>("https://jsonplaceholder.typicode.com/users");
  }

  getUsersJson() : Observable<User[]>
  {
    return  this.httpClient.get<User[]>(this.urlUsers);
  }
  addUser(user : User) : Observable<User>
  {
    return this.httpClient.post<User>(this.urlUsers,user,this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  deleteUser(user: number | User ) :Observable<User>
  {
    const id = typeof  user == 'number' ? user : user.id;
    const url=this.urlUsers+'/'+id;
    return this.httpClient.delete<User>(url).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(id:number, user:User):Observable<User>
  {
    return this.httpClient.put<User>(this.urlUsers+'/'+id,user,this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getUserByIdJson(id: number): Observable<User>
  {
    return this.httpClient.get<User>(this.urlUsers +'/'+ id);
  }

  login(username:string,password:string): Observable<User>
  {
    return this.httpClient.get<User>(this.urlUsers +'?username='+ username+'&password='+password);
  }
  public userLoggedIn(): Observable<User>
  {
    return this.httpClient.get<User>(this.urlUsers +'?logged='+true);
  }
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {

      errorMessage = `Error: ${error.error.message}`;
    } else {

      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
