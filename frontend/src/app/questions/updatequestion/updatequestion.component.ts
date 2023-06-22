import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { QuestionsPageActions } from '../questionstate/questions.actions';

@Component({
  selector: 'app-updatequestion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './updatequestion.component.html',
  styleUrls: ['./updatequestion.component.css']
})
export class UpdatequestionComponent {

  
  constructor(private store:Store){}
  closeModal(){
    this.store.dispatch(QuestionsPageActions.toggleShowModalView())
  }
}
