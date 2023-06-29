import { AfterViewInit, Component, Input, OnInit,  QueryList,  Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { iQuestion, iTag } from '../questions.model';
import { Store } from '@ngrx/store';
import { QuestionsFormComponent } from '../questions-form/questions-form.component';
import { selectQuestionForm, selectSingleQuestion, selectUpdateQuestionForm } from '../../state/questionstate/questions.selector';
import { QuestionsAPIActions, QuestionsPageActions } from '../../state/questionstate/questions.actions';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdatequestionComponent } from '../updatequestion/updatequestion.component';
import { getTags } from 'src/app/state/tagstate/tags.action';
import { selectTags } from 'src/app/state/tagstate/tags.selector';



@Component({
  selector: 'app-questions-list',
  standalone: true,
  imports: [CommonModule,RouterModule, QuestionsFormComponent, FormsModule, ReactiveFormsModule,UpdatequestionComponent],
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit, AfterViewInit{
  @Input() questions:iQuestion[]|null = []
  @ViewChildren(UpdatequestionComponent) updatecomment?:QueryList<UpdatequestionComponent>

  askquestionForm$ = this.store.select(selectQuestionForm)
  updatequestionForm$ = this.store.select(selectUpdateQuestionForm)
  questiontags:iTag[] = []
  tags$!:iTag[]
  specificanswerid!:string
  questionsobject!:iQuestion[]
  

  
  constructor(private store:Store, private renderer:Renderer2){}

  ngAfterViewInit(): void {
    this.editQuestion(this.specificanswerid)
  }

  ngOnInit(): void {
    this.store.dispatch(getTags())
    this.store.select(selectTags).subscribe(res => {
      if(res) {
        this.tags$ = res
        console.log(this.tags$)        
      }
    }, error => {console.log(error);
    })
  }
  editQuestion(id:string){  
    console.log(id);    
   this.store.dispatch(QuestionsAPIActions.loadSingleQuestionId({id}))
    this.store.dispatch(QuestionsPageActions.toggleShowModalView())    
    
   
  }

    scrollToTop(){
      const oppts:ScrollToOptions = {top:42, behavior:'smooth'}
      this.renderer.setProperty(document.documentElement, 'scrollTop', 0)
      this.renderer.setProperty(document.body, 'scrollTop', 0)
      window.scrollTo(oppts)
  }

  getTagsforQuestion(qid:string){
    return this.tags$.filter(tg => tg.qid === qid)
  }

 
}
