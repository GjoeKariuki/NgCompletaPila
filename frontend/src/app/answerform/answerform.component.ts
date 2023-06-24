import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { QuestionsPageActions } from '../state/questionstate/questions.actions';

@Component({
  selector: 'app-answerform',
  standalone: true,
  imports: [CommonModule, CKEditorModule, ReactiveFormsModule],
  templateUrl: './answerform.component.html',
  styleUrls: ['./answerform.component.css']
})
export class AnswerformComponent implements OnInit {
  
  answerForm!:FormGroup
  public Editor = ClassicEditor
  
  constructor(private store:Store){}
  ngOnInit(): void {
    this.answerForm = new FormGroup({
      answer: new FormControl('', [Validators.required]),
      answertext: new FormControl('', [Validators.required])
    })
  }
  closeanswerModal(){
    this.store.dispatch(QuestionsPageActions.toggleShowAnswersForm())
  }
}
