import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';




export const TOAST_STATE = {
  success: "toast-class success-toast",
  warning: "toast-class warning-toast",
  danger: "toast-class danger-toast"
}



@Injectable({
  providedIn: 'root'
})
export class ToastuiService {

  public showsToast$:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public toastMessage$:BehaviorSubject<string> = new BehaviorSubject<string>("this is just another toast")
  public toastState$:BehaviorSubject<string> = new BehaviorSubject<string>(TOAST_STATE.success)

  constructor() { }

  showToast(toastState:string,toastMsg:string): void{
    this.showsToast$.next(true)
    this.toastState$.next(toastState)
    this.toastMessage$.next(toastMsg)
  }
  dismissToast(){
    this.showsToast$.next(false)
  }
}
