import { Injectable } from "@angular/core";
import * as fromActions from './comments.actions'
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CommentsService } from "src/app/services/comments.service";
import { Router } from "@angular/router";
import { catchError, concatMap, map, mergeMap, of } from "rxjs";



@Injectable()
export class CommentsEffects {
    ngrxOnInitEffects(){
        return fromActions.CommentsAPIActions.getComments()
    }

    loadcomments$ = createEffect(() => 
    this.action$.pipe(ofType(fromActions.CommentsAPIActions.getComments),
    mergeMap(() => this.commentservice.getallComments().pipe(
        map((comments) => fromActions.CommentsAPIActions.getCommentsSuccess({comments})),
        catchError((error) => of(fromActions.CommentsAPIActions.getCommentsFail({error:error})))
    )
    )))

    

    addcomments$ = createEffect(() => 
    this.action$.pipe(ofType(fromActions.CommentsAPIActions.addComment),
    mergeMap((action) => this.commentservice.createcomments(action.newcomment).pipe(
        map((response) => fromActions.CommentsAPIActions.addCommentSuccess({message:response})),
        catchError((error) => of(fromActions.CommentsAPIActions.addCommentFail({error:error})))
    ))))

    updatecomment$ = createEffect(() => 
    this.action$.pipe(ofType(fromActions.CommentsAPIActions.updateComment),
    concatMap((action) => this.commentservice.updatecomment(action.id,action.updatecomment).pipe(
        map((response) => fromActions.CommentsAPIActions.updateCommentSuccess({comment:response})),
        catchError((error) => of(fromActions.CommentsAPIActions.updateCommentFail({error:error})))
    ))))

    constructor(
        private action$:Actions, private commentservice:CommentsService, private router:Router
    ){}
}