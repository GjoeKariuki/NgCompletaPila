import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { QuestionsPageActions } from '../state/questionstate/questions.actions';
import { addnewAnswer } from '../state/answerstate/answers.actions';

@Component({
  selector: 'app-answerform',
  standalone: true,
  imports: [CommonModule, CKEditorModule, ReactiveFormsModule],
  templateUrl: './answerform.component.html',
  styleUrls: ['./answerform.component.css']
})
export class AnswerformComponent implements OnInit {
  @Input() questionID!:string
  answersForm!:FormGroup
  public Editor = ClassicEditor
  
  constructor(private store:Store, private fb:FormBuilder){}
  ngOnInit(): void {
    this.answersForm = this.fb.group({
      atitle: ['', [Validators.required]],
      abody: ['', [Validators.required]],
    })
  }

  submitForm(){
    console.log(this.answersForm.value);
    const {atitle, abody} = this.answersForm.value
    // dispatch add answer action
    this.store.dispatch(addnewAnswer({newanswer:{qid:this.questionID,atitle,abody}}))
    this.closeanswerModal()
    // load answers for this question
  }
  closeanswerModal(){
    this.store.dispatch(QuestionsPageActions.toggleShowAnswersForm())
  }
}
