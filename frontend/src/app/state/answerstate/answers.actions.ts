import { createAction, props } from "@ngrx/store";
import { addAnswer, iAnswer, iMessage } from "src/app/questions/questions.model";



export const getAnswers = createAction('[Answers] - getAnswers')
export const getAnswersSuccess = createAction('[Answers] - getAnswersSUccess', props<{answers:iAnswer[]}>())
export const getAnswersFail = createAction('[Answers] - getAnswerFail', props<{error:string}>())
export const getAnswersbyQuestions = createAction('[Answers] - getanswersbyqid', props<{answers:iAnswer[]}>())
export const getAnswerbyId = createAction('[Answers] - getanswerbyid', props<{id:string}>())
export const addnewAnswer = createAction('[Answers] - addanswers', props<{newanswer:addAnswer}>())
export const addnewAnswerSuccess = createAction('[Answers] - addnewAnswers success', props<{message:iMessage}>())
export const addnewAnswerFail = createAction('[Answers] - add new answer fail', props<{error:string}>())
export const updateAnswer = createAction('[Answers] - update answer',props<{updateanswer:addAnswer, id:string}>())
export const updateAnswerSuccess = createAction('[Answers] - update answer success', props<{answer:iAnswer}>())
export const updateAnswerFail = createAction('[Answers] - update answer fail', props<{error:string}>())
