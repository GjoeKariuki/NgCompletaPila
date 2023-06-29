import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { addUser, changePwd, iMessage, iUser } from '../questions/questions.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersdburl = 'http://localhost:8080/users'
  constructor(private _httpclient: HttpClient) { }
  question$ = new Subject<iUser[]>()

  register(user:addUser):Observable<iMessage>{
    return this._httpclient.post<iMessage>(this.usersdburl,user).pipe(
      catchError(this.handlError)
    )
  }

  getallUsers(): Observable<iUser[]> {
    let token = localStorage.getItem('token') as string
    return this._httpclient.get<iUser[]>(this.usersdburl,
      {
        headers: new HttpHeaders().set('token', token)
      }).pipe(
        catchError(this.handlError)
      )
  }

  getuserById(id: string): Observable<iUser> {
    let token = localStorage.getItem('token') as string
    return this._httpclient.get<iUser>(`${this.usersdburl + '/id'}/${id}`,
      {
        headers: new HttpHeaders().set('token', token)
      }).pipe(
        catchError(this.handlError)
      )
  }

  getuserByEmail(email: string): Observable<iUser> {
    let token = localStorage.getItem('token') as string
    return this._httpclient.get<iUser>(`${this.usersdburl + '/barittos'}?uzeremail='${email}'`,
      {
        headers: new HttpHeaders().set('token', token)
      }).pipe(
        catchError(this.handlError)
      )
  }

  updateUser(id: string, user: addUser): Observable<iUser> {
    let token = localStorage.getItem('token') as string
    return this._httpclient.put<iUser>(`${this.usersdburl}/${id}`, user,
      {
        headers: new HttpHeaders().set('token', token)
      }).pipe(
        catchError(this.handlError)
      )
  }

  


  deleteUser(email: string): Observable<iMessage> {
    let token = localStorage.getItem('token') as string
    return this._httpclient.delete<iMessage>(`${this.usersdburl}/${email}`,
      {
        headers: new HttpHeaders().set('token', token)
      }).pipe(
        catchError(this.handlError)
      )
  }

  resetUserPassword(id:string, passwordobject:changePwd):Observable<iUser>{
    let token = localStorage.getItem('token') as string
    return this._httpclient.put<iUser>(`${this.usersdburl + '/pwd'}/${id}`, passwordobject,
      {
        headers: new HttpHeaders().set('token', token)
      }).pipe(
        catchError(this.handlError)
      )
  }

  private handlError({ status }: HttpErrorResponse) {
    return throwError(() => `${status}: something happend with users db`)
  }

}
