import { Component, Renderer2,Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { QuestionsFormComponent } from '../questions-form/questions-form.component';
import { QuestionsListComponent } from '../questions-list/questions-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule,QuestionsFormComponent,QuestionsListComponent, FontAwesomeModule],
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  sidebarVisible=true
  askquestionform = false
  faBars = faBars
  isNavopen= true
  iSmallScreen = false
  constructor(private renderer2:Renderer2, @Inject(DOCUMENT) private _document:Document){}
  
  
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
  
  toggleSidebar(){
    this.sidebarVisible = !this.sidebarVisible
    const sidebar = document.querySelector('.bg-gray-800') as HTMLDivElement
    sidebar.classList.toggle('hidden', !this.sidebarVisible)
  }

  toggleQuestionForm(){
    this.askquestionform = !this.askquestionform
  }
}
