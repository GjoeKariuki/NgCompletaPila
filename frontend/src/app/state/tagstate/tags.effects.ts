import { Injectable } from "@angular/core";
import * as fromTagAction from './tags.action'
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TagsService } from "src/app/services/tags.service";
import { Router } from "@angular/router";
import { catchError, concat, concatMap, map, mergeMap, of } from "rxjs";

@Injectable()
export class TagsEffects {
    ngrxOnInitEffects(){
        return fromTagAction.getTags()
    }

    loadtags$ = createEffect(() =>
        this.action$.pipe(ofType(fromTagAction.getTags),
            mergeMap(() => this.tagservice.getallTags().pipe(
                map((tags) => fromTagAction.getTagsSuccess({ tags })),

                catchError((error) => of(fromTagAction.getTagsFail({ error: error })))
            ))
        )
    )

    loadtagsbyEmail$ = createEffect(() => 
    this.action$.pipe(ofType(fromTagAction.getTagsbyQ),
    concatMap((action) => this.tagservice.gettagsbyQid(action.id).pipe(
        map((tags) => fromTagAction.getTagsbyQSuccess({tags_question:tags})),
        catchError((error) => of(fromTagAction.getTagsbyQFail({error:error})))
    ))))

    addtags$ = createEffect(() => 
    this.action$.pipe(ofType(fromTagAction.addTags),
    mergeMap((action)=>this.tagservice.createTag(action.tag).pipe(
        map((response) => fromTagAction.addTagsSuccess({message:response})),
        catchError((error) => of(fromTagAction.addTagsFail({error:error})))
    ))))
    
      
    constructor(
        private action$:Actions,
        private tagservice:TagsService, 
        private router:Router){}
}