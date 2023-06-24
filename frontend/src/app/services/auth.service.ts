import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isuserLoggedin = false
  _role = ''
  _name = ''

  getUserName(){
    return this._name
  }
  getUserRole(){
    return this._role
  }
  setUserRole(role:string){
    this._role=role
  }
  setUserName(name:string){
    this._name = name
  }
  getAuthorizeStatus():Promise<boolean>{
    const promise = new Promise<boolean>((resolve, reject) => {
      setTimeout(()=> {
        resolve(this.isuserLoggedin)
      },10)
    })
    return promise
  }
  loginUser(){
    this.isuserLoggedin = true
  }
  logoutUser() {
    this.isuserLoggedin = false
  }
}
