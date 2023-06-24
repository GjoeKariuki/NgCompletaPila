import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterceptokenService implements HttpInterceptor {

  constructor() { }

  intercept(req:HttpRequest<any>, next:HttpHandler){
    if(req.url !== ''){
      const token = <string>localStorage.getItem('token')
      let modifiedrequst = req.clone({headers:new HttpHeaders().append('token',token)})
      return next.handle(modifiedrequst)
    }
    return next.handle(req),
  }
}
