import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-answerform',
  standalone: true,
  imports: [CommonModule, CKEditorModule, ReactiveFormsModule],
  templateUrl: './answerform.component.html',
  styleUrls: ['./answerform.component.css']
})
export class AnswerformComponent {
  answerForm = new FormGroup({
    answer: new FormControl('', [Validators.required]),
    answertext: new FormControl('', [Validators.required])
  })
  public Editorred = ClassicEditor
  constructor(){}
}
