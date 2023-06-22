import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Question } from '../questions.model';
import { Store } from '@ngrx/store';
import { QuestionsFormComponent } from '../questions-form/questions-form.component';
import { selectQuestionForm, selectUpdateQuestionForm } from '../questionstate/questions.selector';
import { QuestionsAPIActions, QuestionsPageActions } from '../questionstate/questions.actions';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdatequestionComponent } from '../updatequestion/updatequestion.component';

@Component({
  selector: 'app-questions-list',
  standalone: true,
  imports: [CommonModule,RouterModule, QuestionsFormComponent, FormsModule, ReactiveFormsModule,UpdatequestionComponent],
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit{
  @Input() questions:Question[]|null = []

  askquestionForm$ = this.store.select(selectQuestionForm)
  updatequestionForm$ = this.store.select(selectUpdateQuestionForm)
  

  
  constructor(private store:Store, private renderer:Renderer2){}

  ngOnInit(): void {
    
  }
  editQuestion(){
    this.store.dispatch(QuestionsPageActions.toggleShowModalView())
    // const newvalue = true
    // this.store.dispatch(QuestionsPageActions.toggleShowUpdateQuestionsForm({newvalue}))
    // app-questions-form
   
    // access ask question form set to true
    //this.store.dispatch(QuestionsPageActions.toggleShowQuestionsForm())
    //console.log(qt)
    // sending the data to the form
    //this.store.dispatch(QuestionsAPIActions.passUpdateData({updateQuestion:qt}))

    // open form na ku populate fields

    // redirect to top of page of forms page
    //this.scrollToTop()
  }

    scrollToTop(){
      const oppts:ScrollToOptions = {top:42, behavior:'smooth'}
      this.renderer.setProperty(document.documentElement, 'scrollTop', 0)
      this.renderer.setProperty(document.body, 'scrollTop', 0)
      window.scrollTo(oppts)
  }

 
}
