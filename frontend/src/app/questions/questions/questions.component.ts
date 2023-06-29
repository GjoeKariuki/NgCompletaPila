import { Component, Renderer2,Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { QuestionsFormComponent } from '../questions-form/questions-form.component';
import { QuestionsListComponent } from '../questions-list/questions-list.component';
import {Store} from '@ngrx/store'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons'
import { QuestionsPageActions } from '../../state/questionstate/questions.actions';
import { Observable, map, of, switchMap } from 'rxjs';
import {  selectErrorMessage, selectQuestionForm, selectQuestions,   selectShowModalView, selectUpdateQuestionForm, selectquestionsId } from '../../state/questionstate/questions.selector';
import { UpdatequestionComponent } from '../updatequestion/updatequestion.component';

import { iQuestion } from '../questions.model';
import { SearchfilterPipe } from 'src/app/services/searchfilter.pipe';
import { FormsModule } from '@angular/forms';
import { userId } from 'src/app/state/userstate/users.selector';
import { UsersActionApI } from 'src/app/state/userstate/users.action';


@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule,FormsModule,QuestionsFormComponent,QuestionsListComponent, FontAwesomeModule,UpdatequestionComponent,SearchfilterPipe],
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  

  searchkeyword = ''
  selectedFilter:string = ''
  questions$!:Observable<iQuestion[]> 
  filteredquestions$!:Observable<iQuestion[]> 
  
  askquestionform$ = this.store.select(selectQuestionForm)  
 
  updatequestionForm$ = this.store.select(selectUpdateQuestionForm)
  
  
  questionID = this.store.select(selectquestionsId)
  errorMessage$ = this.store.select(selectErrorMessage)

  showModal!:boolean
  sidebarVisible=true
  faBars = faBars
  isNavopen= true
  iSmallScreen = false
  questArry!:iQuestion[]|[]

  userid!:string|null
 
  
  constructor(
    private store:Store,    
    private renderer2:Renderer2,
    @Inject(DOCUMENT) private _document:Document)
    {
      
    }
  
  
  ngOnInit(): void {
   
    this.store.dispatch(QuestionsPageActions.loadQuestions())
    this.questions$ =this.store.select(selectQuestions).pipe(
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
    
    // this.filteredquestions$ = this.questions$.pipe(
    //   switchMap(questions => {
    //     if (this.selectedFilter === 'myQuestions'){
    //       return this.filterMyQuestions(questions)
    //     } else if (this.selectedFilter === 'allQuestions'){        
    //       return of(questions)
    //     }
    //   })
    // )
    this.checkScreenSixe()
    window.addEventListener('resize', () => this.checkScreenSixe())
    this.userid = localStorage.getItem('userid')
    console.log('wwae')
    console.log(this.userid)
    
    
  }

  // filterMyQuestions(questions:iQuestion[]):Observable<iQuestion[]>{
    
  //    this.questArry =  questions.map(x=>x.uid == '03d1c15f-f058-4393-a49e-090af0c955b2')
   
  // }

 
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
    this.store.select(selectShowModalView).subscribe(
      res => {if(res){
        this.showModal = res
      }},
      error => {console.log(error);
      }
    )
    this.updatequestionForm$.subscribe((updatequestionform:boolean) => {
      if(updatequestionform === true){
        const newvalue = false
        this.store.dispatch(QuestionsPageActions.toggleShowUpdateQuestionsForm({newvalue}))
      }
    })
    
    //this.askquestionform = !this.askquestionform
  }


}
