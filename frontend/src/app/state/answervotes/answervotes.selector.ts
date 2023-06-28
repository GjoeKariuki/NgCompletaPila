import { getRouterSelectors } from "@ngrx/router-store";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromReducer from './answervotes.reducer'


export const selectAnswerVotesState = createFeatureSelector<fromReducer.AnswerVotesInterface>('answervotes')
export const selectAnswerVotes = createSelector(selectAnswerVotesState, (state) => state.answervotes)


export const {selectRouteParams} = getRouterSelectors()
