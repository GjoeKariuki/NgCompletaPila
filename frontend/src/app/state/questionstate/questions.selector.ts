import { createFeatureSelector, createSelector, select } from "@ngrx/store";
import * as fromQuestions from "./question.reducer";
import { getRouterSelectors } from "@ngrx/router-store";


export const selectQuestionState = createFeatureSelector<fromQuestions.QuestionsState>('questions')
export const selectQuestions = createSelector(selectQuestionState, (questionstate) => questionstate.questions)
const questionId = createSelector(selectQuestionState, (questionstate) => questionstate.questionId)
export const selectSingleQuestion = createSelector(selectQuestions, questionId, (questionstate, id) => {
    return questionstate.find(x => x.qid === id)
}
)
// export const selectQuestions = createSelector(selectQuestionState, fromQuestions.selectQuestions)
// export const selectQuestionEntitites = createSelector(selectQuestionState, fromQuestions.selectQuestionEntitites)
export const selectQuestionsLoading = createSelector(selectQuestionState, (questionstate) => questionstate.loading)
export const selectQuestionForm = createSelector(selectQuestionState, (questionstate) => questionstate.askquestionForm)
export const selectUpdateQuestionForm = createSelector(selectQuestionState, (questionstate)=>questionstate.updatequestionForm)
export const selectErrorMessage = createSelector(selectQuestionState, (questionstate) => questionstate.errorMessage)
export const selectUpdateQuestiondata = createSelector(selectQuestionState, (questionstate)=>questionstate.updateQuestion)
export const selectShowModalView = createSelector(selectQuestionState, (questionstate) => questionstate.showModal)
export const selectShowAnswersForm = createSelector(selectQuestionState, (questionstate) => questionstate.answerquestionForm)
// export const selectSingleQuestion = createSelector(selectQuestionState, (questionstate) => questionstate.questionId)


export const {selectRouteParams} = getRouterSelectors()
