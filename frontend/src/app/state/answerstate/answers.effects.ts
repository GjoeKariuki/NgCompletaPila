import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AnswersService } from "src/app/services/answers.service";
import * as fromActions from './answers.actions'
import { catchError, concatMap, map, mergeMap, of } from "rxjs";

@Injectable()
export class AnswersEffect {
    
    loadanswer$ = createEffect(()=> {
        return this.action$.pipe(
            ofType(fromActions.getAnswers),
            mergeMap(() => {
                return this.answerservice.getallAnswers().pipe(
                    map(answers => {
                        return fromActions.getAnswersSuccess({answers})
                    }),
                    catchError(error => of(fromActions.getAnswersFail({error:error.message})))
                )
            })
        )
    })

    addAnswer$ = createEffect(() => {
        return this.action$.pipe(
            ofType(fromActions.addnewAnswer),
            concatMap(action => {
                return this.answerservice.createanswer(action.newanswer).pipe(
                    map(response=> {
                        return fromActions.addnewAnswerSuccess({message:response})
                    }),
                    catchError(error => of(fromActions.addnewAnswerFail({error:error.message})))
                )
            })
        )
    })

    updateAnswer$ = createEffect(() => {
        return this.action$.pipe(
            ofType(fromActions.updateAnswer),
            concatMap(action => {
                return this.answerservice.updateAnswer(action.id,action.updateanswer).pipe(
                    map(response => {
                        return fromActions.updateAnswerSuccess({answer:response})
                    }),
                    catchError(error => of(fromActions.updateAnswerFail({error:error.message})))
                )
            })
        )
    })
    constructor(private action$:Actions, private answerservice:AnswersService, private router:Router){}
}