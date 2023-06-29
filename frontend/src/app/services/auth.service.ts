import { Injectable } from '@angular/core';
import { iLoginSuccess } from '../questions/questions.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  role!:string|null
  token!:string|null
  username!:string|null
  userID!:string|null

  constructor() { }

 
  getUserName() {
    this.username = localStorage.getItem('name')
    return this.username
  }

  getUserRole(){
    this.role = localStorage.getItem('role')
    return this.role
  }

  getAuthorizeStatus(){
    let token=localStorage.getItem('token')
    this.token = token?token:null
    return this.token? true:false

  }
  loginUser(res:iLoginSuccess){    
    localStorage.setItem('token',res.token)
    localStorage.setItem('role',res.role)
    localStorage.setItem('name', res.name)
    localStorage.setItem('email', res.email)
    
    
  }
  logoutUser() {
    localStorage.clear()    
  }
}
