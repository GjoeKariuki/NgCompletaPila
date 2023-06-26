import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule,DOCUMENT } from '@angular/common';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { iQuestion } from '../questions.model';

import { Store } from '@ngrx/store';
import { selectUpdateQuestionForm, selectUpdateQuestiondata } from '../../state/questionstate/questions.selector';
import { QuestionsAPIActions, QuestionsPageActions } from '../../state/questionstate/questions.actions';


@Component({
  selector: 'app-questions-form',
  standalone: true,
  imports: [CommonModule,CKEditorModule,ReactiveFormsModule],
  templateUrl: './questions-form.component.html',
  styleUrls: ['./questions-form.component.css']
})
export class QuestionsFormComponent implements OnInit {

  updateQuestion$ = this.store.select(selectUpdateQuestiondata) 
  updatequestionForm$ = this.store.select(selectUpdateQuestionForm)
  questionsForm!:FormGroup
  editor!:HTMLTextAreaElement
  tagInput!:HTMLInputElement
  tagsContainer!:HTMLDivElement
  public Editor = ClassicEditor
  tags:string[] = []
  newTag:string = ''

  constructor(private fb:FormBuilder,private store:Store,@Inject(DOCUMENT) private _document:Document) {}

  ngOnInit(): void {
      this.questionsForm = this.fb.group({
        qtitle: ['', [Validators.required]],
        qbody: ['', [Validators.required]],
        qtags: ['', [Validators.required]]        
      }) 
      // this.updatequestionForm$.subscribe((val: boolean) => {
      //   if (val === true) {
      //     this.updateQuestion$.subscribe(
      //       objdata => {
      //       if (objdata) {
      //         this.questionsForm.patchValue({
      //           qtitle: objdata[0].qtitle,
      //           qbody: objdata[0].qbody,
      //           qtags: 'my tags'
      //         })
      //         console.log('form values', this.questionsForm);
              
      //       }
      //     })
      //   } else {
      //     // this.questionsForm.reset()
      //   }
      // })    
  }

  addTag(){
    if(this.newTag.trim() !== ''){
      this.tags.push(this.newTag.trim())
      this.newTag = ''
    }
  }

  removeTag(tag:string){
    const index = this.tags.indexOf(tag)
    if(index !== -1){
      this.tags.splice(index,1)
    }
  }
 
  submitForm(){
    console.log(this.questionsForm.value)
    
    const {qtitle,qbody} = this.questionsForm.value
    const {qtags} = this.questionsForm.value
    console.log(qtitle)
    console.log(qbody)
    console.log(qtags)
    
    
    
    this.store.dispatch(QuestionsPageActions.addQuestion({question:{qtitle,qbody}}))
    
    
    
    // this.store.dispatch(QuestionsPageActions.addQuestion(this.questionsForm.value))
    // this.store.dispatch(QuestionsAPIActions.loadQuestions())
  }
  // populateform(){
  //   this.updatequestionForm$.subscribe((val: boolean) => {
  //     if (val === true) {
  //       this.updateQuestion$.subscribe(
  //         objdata => {
  //         if (objdata) {
  //           this.questionsForm.setValue({
  //             qtitle: objdata[0].Title,
  //             qbody: objdata[0].Body,
  //             qtags: objdata[0].Tags
  //           })
  //         }
  //       })
  //     } else {
  //       // this.questionsForm.reset()
  //     }
  //   })
  // }
  
  closequestionModal(){
    this.store.dispatch(QuestionsPageActions.toggleShowQuestionsForm())
  }




}
