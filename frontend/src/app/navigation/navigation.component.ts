import { Component, Renderer2, Inject, OnInit } from '@angular/core';

import { CommonModule,DOCUMENT } from '@angular/common';
import { RouterModule } from '@angular/router';




@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  navscripts!:HTMLScriptElement
  constructor(private renderer2:Renderer2, @Inject(DOCUMENT) private _document:Document) {
    // this.navscripts = document.createElement("script")
    // this.navscripts.
    // document.body.appendChild(this.navscripts)
  }
 

  ngOnInit(): void {
    const btn = this._document.querySelector("button.mobile-menu-button") as HTMLButtonElement
    const menu = this._document.querySelector(".mobile-menu") as HTMLDivElement
    btn.addEventListener("click", ()=> {
        menu.classList.toggle("hidden")
    })
  }

  
}
