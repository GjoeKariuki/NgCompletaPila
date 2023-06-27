import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromComments from './comments.reducer'
import { getRouterSelectors } from "@ngrx/router-store";


export const selectCommentState = createFeatureSelector<fromComments.CommentsInterface>('comments')
export const selectComments = createSelector(selectCommentState, (commentstate) => commentstate.comments)
const commentsid = createSelector(selectCommentState, (commentstate) => commentstate.commentsId)
export const selectSingleComment = createSelector(selectComments, commentsid, (state,id) => {
    return state.find(x=>x.cid===id)
})

export const {selectRouteParams} = getRouterSelectors()
