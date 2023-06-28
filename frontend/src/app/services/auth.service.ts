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

  constructor() { }

  //router = new Router()

  //isuserLoggedin = false
  // private _role = ''
  // private _name = ''
 

  
  // getUserRole(){
  //   return this._role
  // }

  
  // setUserRole(role:string){
  //   this._role=role
  // }
  // setUserName(name:string){
  //   this._name = name
  // }
  getUserName() {
    this.username = localStorage.getItem('name')
    return this.username
  }
  // getAuthorizeStatus():Promise<boolean>{
  //   const promise = new Promise<boolean>((resolve, reject) => {
  //     setTimeout(()=> {
  //       resolve(this.isuserLoggedin)
  //     },10)
  //   })
  //   return promise
  // }
  getAuthorizeStatus(){
    let token=localStorage.getItem('token')
    this.token = token?token:null
    return this.token? true:false

  }
  loginUser(res:iLoginSuccess){
    //this.isuserLoggedin = true
    localStorage.setItem('token',res.token)
    localStorage.setItem('role',res.role)
    localStorage.setItem('name', res.name)
    localStorage.setItem('email', res.email)
  }
  logoutUser() {
    //this.isuserLoggedin = false
    localStorage.clear()
    
  }
}
