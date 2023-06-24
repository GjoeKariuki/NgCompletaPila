import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { QuestionsPageActions } from '../../state/questionstate/questions.actions';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';



@Component({
  selector: 'app-updatequestion',
  standalone: true,
  imports: [CommonModule,CKEditorModule, FormsModule, ReactiveFormsModule ],
  templateUrl: './updatequestion.component.html',
  styleUrls: ['./updatequestion.component.css']
})
export class UpdatequestionComponent implements OnInit{

  updateForm!:FormGroup
  public Editor = ClassicEditor  
  //display details to be updated
  //public model = {editorData: '<p>Hello there whats happening <strong>George</strong></p>'}

  constructor(private store:Store){}
  ngOnInit(): void {
    this.updateForm = new FormGroup({
      qtitle: new FormControl('', [Validators.required]),
      qbody: new FormControl('', [Validators.required]),
      qtags: new FormControl('', [Validators.required])
    }) 
  }
  closeModal(){
    this.store.dispatch(QuestionsPageActions.toggleShowModalView())
  }
  
}
