import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {animate, state, style, transition, trigger } from '@angular/animations'
import { ToastuiService } from '../services/toastui.service';



@Component({
  selector: 'app-toastui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toastui.component.html',
  styleUrls: ['./toastui.component.css'],
  animations: [
    trigger('toastTrigger', [
      state('open', style({transform:'translateY(0%)'})),
      state('close', style({transform:'translateY(-200%)'})),
      transition('open <=> close', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class ToastuiComponent implements OnInit {

  
  toastClass!:string[]      //toastClass = ['toast-class', 'danger-toast']
  toastmessage!:string      //toastmessage = "this is a good message"
  showsToast!:boolean       //showsToast = false

  
  constructor( public toastservice:ToastuiService){}
  ngOnInit(): void {
    setTimeout(() => {
      //this.toastservice.showsToast$.subscribe()
    }, 1000);
  }

  dismiss(){
    this.toastservice.dismissToast()
  }

}
