import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iLoginSuccess, iMessage, iUser } from '../questions/questions.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  private usersdburl = 'http://localhost:8080/users'
 
  constructor(private httpClient:HttpClient) { }

  register(user:iUser):Observable<iMessage>{
    return this.httpClient.post<iMessage>(this.usersdburl,user)
  }

  login(user:iUser):Observable<iLoginSuccess>{
    //console.log(user);    
    return this.httpClient.post<iLoginSuccess>(this.usersdburl + '/login', user)
  }
}
