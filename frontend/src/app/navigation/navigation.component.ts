import { Component, Renderer2, Inject, OnInit } from '@angular/core';

import { CommonModule,DOCUMENT } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../services/auth.service';




@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  username!:string|null
  navscripts!:HTMLScriptElement
 
  constructor(private renderer2:Renderer2, private router:Router,
    @Inject(DOCUMENT) private _document:Document, 
    private store:Store, public auth:AuthService) {
    // this.navscripts = document.createElement("script")
    // this.navscripts.
    // document.body.appendChild(this.navscripts)
  }
 

  ngOnInit(): void {
    this.username = this.auth.getUserName()
    console.log(this.username);
    
    const btn = this._document.querySelector("button.mobile-menu-button") as HTMLButtonElement
    const menu = this._document.querySelector(".mobile-menu") as HTMLDivElement
    btn.addEventListener("click", ()=> {
        menu.classList.toggle("hidden")
    })

  }

  logoutUser(){
    this.auth.logoutUser()
    this.router.navigate([''])
  }

  
}
