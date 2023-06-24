import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncaTextPipe } from 'src/app/trunca-text.pipe';
import { AnswerformComponent } from 'src/app/answerform/answerform.component';
import { AnswerslistComponent } from 'src/app/answerslist/answerslist.component';
import { Store } from '@ngrx/store';
import { selectShowAnswersForm } from '../../state/questionstate/questions.selector';
import { QuestionsPageActions } from '../../state/questionstate/questions.actions';

@Component({
  selector: 'app-question-detail',
  standalone: true,
  imports: [AnswerformComponent,AnswerslistComponent ,CommonModule, TruncaTextPipe],
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent {
  answerform$=this.store.select(selectShowAnswersForm)
  contextdetails = "I wanted to know if its going to rain today so that i can carry an umbrella. According to the appearance of the clouds they are dark in color "
  questiontags = "'Umbrella','Clouds','Rain'"

  constructor(private store:Store){}
  toggleAnswerForm(){
    this.store.dispatch(QuestionsPageActions.toggleShowAnswersForm())
  }
}
