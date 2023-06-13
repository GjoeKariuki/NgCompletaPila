import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faBars, faHamburger} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-dashadmin',
  standalone: true,
  imports: [CommonModule,FormsModule,FontAwesomeModule],
  templateUrl: './dashadmin.component.html',
  styleUrls: ['./dashadmin.component.css']
})
export class DashadminComponent implements OnInit {
  chk1=false
  chk2=false
  faHamburger = faHamburger
  faBars = faBars
  isNavopen= true
  iSmallScreen = false
  
  constructor(){}

  ngOnInit(): void {
    this.checkScreenSixe()
    window.addEventListener('resize', () => this.checkScreenSixe())
  }

  checkScreenSixe(){
    this.iSmallScreen = window.innerWidth < 768
    if(this.iSmallScreen){
      this.isNavopen = false
    }
    else{
      this.isNavopen = true
    }
  }


  toggleNav() {
    this.isNavopen = !this.isNavopen
  }
  

}
