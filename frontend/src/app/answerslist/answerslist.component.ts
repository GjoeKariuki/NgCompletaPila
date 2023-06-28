import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faCheckDouble, fa8 } from '@fortawesome/free-solid-svg-icons'
import { Store } from '@ngrx/store';
import { getAnswers } from '../state/answerstate/answers.actions';
import { iAnswer, iAnswerVotes, iComments } from '../questions/questions.model';
import { selectAnswers } from '../state/answerstate/answers.selector';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentsAPIActions } from '../state/commentstate/comments.actions';
import { selectComments } from '../state/commentstate/comments.selector';
import { AnswerVotesAPI } from '../state/answervotes/answervotes.action';
import { selectAnswerVotes } from '../state/answervotes/answervotes.selector';

import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons'



@Component({
  selector: 'app-answerslist',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule, FormsModule],
  templateUrl: './answerslist.component.html',
  styleUrls: ['./answerslist.component.css']
})
export class AnswerslistComponent implements OnInit {
  @Input() answersID!: string
  answers$!: iAnswer[]
  //questionanswers!:iAnswer[]
  //faCoffee = faCoffee
  commenz = false
  faChessKnight = faCheckDouble
  fa8 = fa8
  like = faThumbsUp
  dislike = faThumbsDown
  commentsForm!: FormGroup
  myanswerid = ''
  mycomments$!: iComments[]
  answervotes$!: iAnswerVotes[]
  preffered: boolean = false

  constructor(private store: Store, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.commentsForm = this.fb.group({
      cbody: ['', [Validators.required]]
    })
    this.store.dispatch(getAnswers())
    this.store.select(selectAnswers).subscribe(
      res => {
        if (res) {
          this.answers$ = res
          //console.log(res)
        }
      },
      err => {
        console.log(err);
      })
    //this.getAnswersforQuestion(this.answersID)
    this.store.dispatch(CommentsAPIActions.getComments())
    this.store.select(selectComments).subscribe(
      res => {
        if (res) {
          this.mycomments$ = res
          console.log(this.mycomments$);
        }
      }, error => {
        console.log(error);
      }
    )
    // get all answer votes
    // filter by answeid
    // display 

    this.store.dispatch(AnswerVotesAPI.getAnswerVotes())
    this.store.select(selectAnswerVotes).subscribe(
      res => {
        if (res) {
          this.answervotes$ = res
          console.log(this.answervotes$);

        }
      },
      error => {
        console.log(error);

      }
    )

  }

  toggleBelow() {
    this.commenz = !this.commenz
  }

  getAnswersforQuestion(id: string) {
    return this.answers$.filter(ans => ans.qid == id)
  }

  getCommentsforAnswer(id: string) {
    return this.mycomments$.filter(cms => cms.aid == id)
  }

  getVotesforAnswer(id: string) {
    return this.answervotes$.filter(avs => avs.aid == id)
  }

  submitForm(id: string) {
    console.log(id)
    console.log(this.commentsForm.value)
    const { cbody } = this.commentsForm.value
    // add comment
    this.store.dispatch(CommentsAPIActions.addComment({ newcomment: { aid: id, cbody } }))
    alert('comment added successful')
    this.commentsForm.reset()
    this.myanswerid = id
    // get comments for answer
    // display comments by answer
    this.store.dispatch(CommentsAPIActions.getComments())
  }





}
