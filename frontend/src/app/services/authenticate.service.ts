import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iLoginSuccess, iMessage, iUser } from '../questions/questions.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private httpClient:HttpClient) { }

  register(user:iUser):Observable<iMessage>{
    return this.httpClient.post<iMessage>('',user)
  }

  login(user:iUser):Observable<iLoginSuccess>{
    return this.httpClient.post<iLoginSuccess>('', user)
  }
}
