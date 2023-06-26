import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { QuestionService } from "../../questions/question.service";
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
        mergeMap(() => this.questionservice.getallQuestions().pipe(
            map((questions) => QuestionsAPIActions.questionsLoadedSuccess({questions})),
            catchError((error) => of(QuestionsAPIActions.questionsLoadedFail({error:error})))
        ))))
    
    addquestion$ = createEffect(() => 
    this.action$.pipe( ofType(QuestionsPageActions.addQuestion),
        mergeMap((action) => this.questionservice.createquestion(action.question).pipe(
            map((response) => QuestionsAPIActions.questionAddedSuccess({message:response})),
            catchError((error) => of(QuestionsAPIActions.questionAddedFail({error:error})))
        ))))
    
    updatequestion$ = createEffect(() => 
    this.action$.pipe( ofType(QuestionsPageActions.updateQuestion),
        concatMap((action) => this.questionservice.updateQuestion(action.id, action.question).pipe(
            map((response) => QuestionsAPIActions.questionUpdatedSuccess({question:response})),
            catchError((error) => of(QuestionsAPIActions.questionUpdatedFail({error:error})))
        ))))
    
    deletequestion$ = createEffect(() => 
    this.action$.pipe( ofType(QuestionsPageActions.deleteQuestion),
        concatMap((action) => this.questionservice.deleteQuestion(action.id).pipe(
            map((response) => QuestionsAPIActions.questionDeletedSuccess({message:response})),
            catchError((error) => of(QuestionsAPIActions.questionDeletedFail({error:error})))
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
