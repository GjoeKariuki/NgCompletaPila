import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncaTextPipe } from 'src/app/trunca-text.pipe';
import { AnswerformComponent } from 'src/app/answerform/answerform.component';
import { AnswerslistComponent } from 'src/app/answerslist/answerslist.component';

@Component({
  selector: 'app-question-detail',
  standalone: true,
  imports: [AnswerformComponent,AnswerslistComponent ,CommonModule, TruncaTextPipe],
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent {
  answerform=false
  contextdetails = "I wanted to know if its going to rain today so that i can carry an umbrella. According to the appearance of the clouds they are dark in color "
  questiontags = "'Umbrella','Clouds','Rain'"
  toggleAnswerForm(){
    this.answerform = !this.answerform
  }
}
