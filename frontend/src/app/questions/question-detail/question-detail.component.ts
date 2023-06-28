import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncaTextPipe } from 'src/app/trunca-text.pipe';
import { AnswerformComponent } from 'src/app/answerform/answerform.component';
import { AnswerslistComponent } from 'src/app/answerslist/answerslist.component';
import { Store } from '@ngrx/store';
import { selectShowAnswersForm, selectSingleQuestion } from '../../state/questionstate/questions.selector';
import { QuestionsAPIActions, QuestionsPageActions } from '../../state/questionstate/questions.actions';
import { iQuestion, iTag } from '../questions.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { getTagsbyQ } from 'src/app/state/tagstate/tags.action';
import { selectTagsForSpecificQuestionid } from 'src/app/state/tagstate/tags.selector';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-question-detail',
  standalone: true,
  imports: [AnswerformComponent,AnswerslistComponent ,CommonModule, TruncaTextPipe, FormsModule],
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit{
  answerform$=this.store.select(selectShowAnswersForm)
  contextdetails = "I wanted to know if its going to rain today so that i can carry an umbrella. According to the appearance of the clouds they are dark in color "
  //questiontags = "'Umbrella','Clouds','Rain'"
  questiontags!:iTag[]

  question!:iQuestion
  id!:string

  constructor(private store:Store, private route:ActivatedRoute, private router:Router){
    
    
  }

  ngOnInit() {
    this.route.params.subscribe((param:Params) => {
      this.id = param['id']
      this.store.dispatch(QuestionsAPIActions.loadSingleQuestionId({id:param['id']}))
      //console.log('newz' + this.store.dispatch(QuestionsAPIActions.loadSingleQuestionId({id:param['id']})));

    })
    this.store.select(selectSingleQuestion).subscribe(response => {
      if(response) {
        this.question = response
        this.store.dispatch(getTagsbyQ({id:this.question.qid}))
        console.log(this.question);
      }
    }, error => {console.log(error);
    })
    this.store.select(selectTagsForSpecificQuestionid).subscribe(
      res => { if (res) { 
        console.log(res);
        this.questiontags = res       
       } },
      error => {
        console.log(error);
      }
    )
  }
  toggleAnswerForm(){
    this.store.dispatch(QuestionsPageActions.toggleShowAnswersForm())
  }
}
