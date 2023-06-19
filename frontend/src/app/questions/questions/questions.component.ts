import { Component, Renderer2,Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { QuestionsFormComponent } from '../questions-form/questions-form.component';
import { QuestionsListComponent } from '../questions-list/questions-list.component';

import {Store} from '@ngrx/store'
// import {QuestionsPageActions} from '../questionstate/questions.actions'
// import {selectQuestionErrorMessage} from '../questionstate/questions.selector'
// import {QuestionsStore} from '../questions.store'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons'
import { QuestionsPageActions } from '../questionstate/questions.actions';
import { sequenceEqual } from 'rxjs';
import { selectErrorMessage, selectQuestionForm, selectQuestions, selectQuestionsLoading } from '../questionstate/questions.selector';


@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule,QuestionsFormComponent,QuestionsListComponent, FontAwesomeModule],
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  
  questions$ = this.store.select(selectQuestions) 
  askquestionform$ = this.store.select(selectQuestionForm)  
  errorMessage$ = this.store.select(selectErrorMessage)
  loading$ = this.store.select(selectQuestionsLoading)

  sidebarVisible=true
  faBars = faBars
  isNavopen= true
  iSmallScreen = false
 
  // private questionsStore:QuestionsStore,
  constructor(
    private store:Store,    
    private renderer2:Renderer2,
    @Inject(DOCUMENT) private _document:Document)
    {
      this.store.subscribe((store) =>console.log({store}))
    }
  
  
  ngOnInit(): void {
    // this.questionsStore.getQuestions()
    // this.store.dispatch(QuestionsPageActions.loadQuestions())  
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
    this.store.dispatch(QuestionsPageActions.toggleShowQuestionsForm())
    //this.askquestionform = !this.askquestionform
  }


}
