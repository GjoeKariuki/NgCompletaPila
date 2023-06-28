import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule,DOCUMENT } from '@angular/common';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { iQuestion } from '../questions.model';

import { Store } from '@ngrx/store';
import { selectUpdateQuestionForm, selectUpdateQuestiondata } from '../../state/questionstate/questions.selector';
import { QuestionsAPIActions, QuestionsPageActions } from '../../state/questionstate/questions.actions';
import {addTags, getTags} from '../../state/tagstate/tags.action'

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
        tname: ['', [Validators.required]]        
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
    console.log(this.questionsForm.value);
    const {qtitle,qbody,tname} = this.questionsForm.value
    //const {qtags} = this.questionsForm.value  
    this.store.dispatch(QuestionsPageActions.addQuestion({question:{qtitle,qbody,tname}}))
    //this.store.dispatch(addTags({tag:{tname:[qtags]}}))
    this.store.dispatch(QuestionsAPIActions.loadQuestions())
    //this.store.dispatch(getTags())  
    this.closequestionModal()  
    this.store.dispatch(QuestionsPageActions.loadQuestions()) 
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
