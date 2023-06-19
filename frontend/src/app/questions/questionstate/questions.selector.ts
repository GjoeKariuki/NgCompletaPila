import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromQuestions from "./questions.reducer";
import { from } from "rxjs";
import { getRouterSelectors } from "@ngrx/router-store";


export const selectQuestionState = createFeatureSelector<fromQuestions.QuestionsState>('questions')
export const selectQuestions = createSelector(selectQuestionState, fromQuestions.selectQuestions)
export const selectQuestionEntitites = createSelector(selectQuestionState, fromQuestions.selectQuestionEntitites)
export const selectQuestionsLoading = createSelector(selectQuestionState, (questionstate) => questionstate.loading)
export const selectQuestionForm = createSelector(selectQuestionState, (questionstate) => questionstate.askquestionForm)
export const selectErrorMessage = createSelector(selectQuestionState, (questionstate) => questionstate.errorMessage)
export const {selectRouteParams} = getRouterSelectors()
export const selectQuestionById = createSelector(selectQuestionEntitites, selectRouteParams, (questionentities, {id}) => questionentities[id])
