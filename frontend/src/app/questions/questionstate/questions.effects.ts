import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { QuestionService } from "../question.service";
import { QuestionsAPIActions, QuestionsPageActions } from "./questions.actions";
import { catchError, concatMap, map, mergeMap, of, tap } from "rxjs";
import { Router } from "@angular/router";


@Injectable()
export class QuestionEffects {
    
    ngrxOnInitEffects() {
        return QuestionsPageActions.loadQuestions()
    }
    
    loadquestions$ = createEffect(() => 
    this.action$.pipe( ofType(QuestionsPageActions.loadQuestions),
        concatMap(() => this.questionservice.getallQuestions().pipe(
            map((questions) => QuestionsAPIActions.questionsLoadedSuccess({questions})),
            catchError((error) => of(QuestionsAPIActions.questionsLoadedFail({message:error})))
        ))))
    
    addquestion$ = createEffect(() => 
    this.action$.pipe( ofType(QuestionsPageActions.addQuestion),
        concatMap(({question}) => this.questionservice.createquestion(question).pipe(
            map((newquestion) => QuestionsAPIActions.questionAddedSuccess({question:newquestion})),
            catchError((error) => of(QuestionsAPIActions.questionAddedFail({message:error})))
        ))))
    
    updatequestion$ = createEffect(() => 
    this.action$.pipe( ofType(QuestionsPageActions.updateQuestion),
        concatMap(({question}) => this.questionservice.updateQuestion(question).pipe(
            map(() => QuestionsAPIActions.questionUpdatedSuccess({update: {id:question.id, changes:question}})),
            catchError((error) => of(QuestionsAPIActions.questionUpdatedFail({message:error})))
        ))))
    
    deletequestion$ = createEffect(() => 
    this.action$.pipe( ofType(QuestionsPageActions.deleteQuestion),
        mergeMap(({id}) => this.questionservice.deleteQuestion(id).pipe(
            map(() => QuestionsAPIActions.questionDeletedSuccess({id})),
            catchError((error) => of(QuestionsAPIActions.questionDeletedFail({message:error})))
        ))))
    
    redirectToQuestionsPage = createEffect(
        () => this.action$.pipe(ofType(
            QuestionsAPIActions.questionAddedSuccess,
            QuestionsAPIActions.questionUpdatedSuccess,
            QuestionsAPIActions.questionDeletedSuccess
        ),
        tap(() => this.router.navigate(['/questioneos']))),
        {dispatch: false}
    )

    
    constructor(
        private action$:Actions, 
        private questionservice:QuestionService,
        private router:Router){}    
    
}
