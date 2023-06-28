import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AnswervotesService } from "src/app/services/answervotes.service";
import { AnswerVotesAPI } from "./answervotes.action";
import { catchError, map, mergeMap, of } from "rxjs";


@Injectable()
export class AnswerVotesEffects {

    ngrxOnInitEffects() {
        return AnswerVotesAPI.getAnswerVotes()
    }

    loadanswervotes$ = createEffect(() => {
        return this.action$.pipe(
            ofType(AnswerVotesAPI.getAnswerVotes),
            mergeMap(() => {
                return this.answervoteservice.getallAnswervotes().pipe(
                    map(answervotes => {
                        return AnswerVotesAPI.getAnswerVotesSuccess({answervotes})
                    }),
                    catchError(error => of(AnswerVotesAPI.getAnswerVotesFail({error})))
                )
            })
        )
    })


    constructor(private action$:Actions, private answervoteservice:AnswervotesService ){}

}