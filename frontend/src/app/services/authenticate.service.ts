import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addUser, iLoginSuccess, iLoginUser, iMessage, iUser } from '../questions/questions.model';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  private usersdburl = 'http://localhost:8080/users'
 
  constructor(private httpClient:HttpClient) { }

  register(user:addUser):Observable<iMessage>{
    return this.httpClient.post<iMessage>(this.usersdburl,user).pipe(
      catchError(this.handlError)
    )
  }

  login(user:iLoginUser):Observable<iLoginSuccess>{
    //console.log(user);    
    return this.httpClient.post<iLoginSuccess>(this.usersdburl + '/login', user).pipe(
      catchError(this.handlError)
    )
  }

  private handlError({status}:HttpErrorResponse){
    return throwError(() => `${status}: something happened registering/login users`)
  }
}
