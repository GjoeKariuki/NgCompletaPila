import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-answerform',
  standalone: true,
  imports: [CommonModule, CKEditorModule],
  templateUrl: './answerform.component.html',
  styleUrls: ['./answerform.component.css']
})
export class AnswerformComponent {

  public Editorred = ClassicEditor
  constructor(){}
}
