import { Component, Renderer2,Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { QuestionsFormComponent } from '../questions-form/questions-form.component';
import { QuestionsListComponent } from '../questions-list/questions-list.component';
import {Store} from '@ngrx/store'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons'
import { QuestionsPageActions } from '../../state/questionstate/questions.actions';
import { map } from 'rxjs';
import {  selectErrorMessage, selectQuestionForm, selectQuestions,   selectShowModalView, selectUpdateQuestionForm, selectquestionsId } from '../../state/questionstate/questions.selector';
import { UpdatequestionComponent } from '../updatequestion/updatequestion.component';

import { iQuestion } from '../questions.model';


@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule,QuestionsFormComponent,QuestionsListComponent, FontAwesomeModule,UpdatequestionComponent],
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  
  questions$ = this.store.select(selectQuestions).pipe(
    map((questions:iQuestion[]) => {
      const sortedQuestions = questions.slice().sort((a,b) => {
        const date1 = new Date(a.qdatecreated)
        const date2 = new Date(b.qdatecreated)
        if(date1<date2){
          return 1
        }else if(date1 > date2){
          return -1
        } else {
          return 0
        }        
      })
      
      return sortedQuestions
    })
  )
  //tags$ = this.store.select(selectTags)
  
  askquestionform$ = this.store.select(selectQuestionForm)  
  // sort observable
  updatequestionForm$ = this.store.select(selectUpdateQuestionForm)
  
  // question id
  // questionID = this.store.select(selectquestionId).subscribe(
  //   res => {
  //     if (res) {
  //       console.log(res)
  //     }
  //   }}, error => { console.log(error) }
  // )
  // get tags for specific question id
  // display the tags
//  questionTags$ = this.store.dispatch(getTagsbyQ(questionID))
  questionID = this.store.select(selectquestionsId)
  errorMessage$ = this.store.select(selectErrorMessage)
  // loading$ = this.store.select(selectQuestionsLoading)
  showModal$=this.store.select(selectShowModalView)
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
      //this.store.subscribe((store) =>console.log({store}))
    }
  
  
  ngOnInit(): void {
    
    console.log('question id' + this.questionID)
    this.store.dispatch(QuestionsPageActions.loadQuestions())
  
    //console.log('tags' + this.tags$);
    
    // this.questionsStore.getQuestions()
    // this.store.dispatch(QuestionsPageActions.loadQuestions())  
    this.checkScreenSixe()
    window.addEventListener('resize', () => this.checkScreenSixe())
  }

  
  checkScreenSixe() {
    this.iSmallScreen = window.innerWidth < 768
    if (this.iSmallScreen) {
      this.isNavopen = false
    }
    else {
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
    this.updatequestionForm$.subscribe((updatequestionform:boolean) => {
      if(updatequestionform === true){
        const newvalue = false
        this.store.dispatch(QuestionsPageActions.toggleShowUpdateQuestionsForm({newvalue}))
      }
    })
    
    //this.askquestionform = !this.askquestionform
  }


}
