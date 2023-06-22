import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule,DOCUMENT } from '@angular/common';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Question } from '../questions.model';

import { Store } from '@ngrx/store';
import { selectUpdateQuestionForm, selectUpdateQuestiondata } from '../questionstate/questions.selector';


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
  public Editorred = ClassicEditor

  constructor(private store:Store,@Inject(DOCUMENT) private _document:Document) {}

  ngOnInit(): void {
      this.questionsForm = new FormGroup({
        qtitle: new FormControl('', [Validators.required]),
        qbody: new FormControl('', [Validators.required]),
        qtags: new FormControl('', [Validators.required])
      }) 
      this.updatequestionForm$.subscribe((val: boolean) => {
        if (val === true) {
          this.updateQuestion$.subscribe(
            objdata => {
            if (objdata) {
              this.questionsForm.patchValue({
                qtitle: objdata[0].Title,
                qbody: objdata[0].Body,
                qtags: objdata[0].Tags
              })
              console.log('form values', this.questionsForm);
              
            }
          })
        } else {
          // this.questionsForm.reset()
        }
      })
    
  }
  operateTags(){
    this.editor = this._document.getElementById('editor') as HTMLTextAreaElement
    this.tagInput = this._document.getElementById('tag-input') as HTMLInputElement
    this.tagsContainer = this._document.getElementById('tags-container') as HTMLDivElement
    this.tagInput.addEventListener('keydown', (event)=>{
      if(event.key == 'Enter' || event.key === ','){
          event.preventDefault()
          let tagText = this.tagInput.value.trim()
          if(tagText){
            this.createTag(tagText)
          }
          this.tagInput.value = ''
      }
    })
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
  createTag(tagText:string){
    const tag = this._document.createElement('div')
    tag.classList.add('tag')
    tag.innerHTML = `
    <span>${tagText}</span>
    <span class="remove-tag" onclick="removeTag(event)">X</span>
    `
    this.tagsContainer.appendChild(tag)
  }

  removeTag(event:MouseEvent){
    const tagged = (event.target as HTMLElement).parentNode
    if(tagged instanceof Node){
      this.tagsContainer.removeChild(tagged)
    }
    
  }




}
