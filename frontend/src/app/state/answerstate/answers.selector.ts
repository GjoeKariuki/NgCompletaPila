import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromAnswers from './answers.reducer'
import { getRouterSelectors } from '@ngrx/router-store'


export const selectQAnswersState = createFeatureSelector<fromAnswers.AnswersInterface>('answers')
export const selectAnswers = createSelector(selectQAnswersState, (answerstate)=>answerstate.answers)
export const selectAnswersId = createSelector(selectQAnswersState,(answerstate)=> answerstate.answerId)
export const selectSingleAnswer = createSelector(selectAnswers,selectAnswersId, (state,id)=> {
    return state.find(x=>x.aid===id)
})

export const {selectRouteParams} = getRouterSelectors()
