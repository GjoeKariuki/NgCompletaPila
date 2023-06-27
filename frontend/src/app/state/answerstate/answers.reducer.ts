import { createReducer, on } from "@ngrx/store";
import { iAnswer } from "src/app/questions/questions.model";
import * as fromActions from './answers.actions'
import { from } from "rxjs";

export interface AnswersInterface {
    answers:iAnswer[]
    answerId:string
    error:string
    addSuccess:string
    addError:string
    updateError:string
}
const initialState:AnswersInterface = {
    addError:'',
    addSuccess:'',
    answerId:'',
    answers: [],
    error:'',
    updateError:''
}


export const AnswersReducer = createReducer<AnswersInterface>(
    initialState,

    on(fromActions.getAnswersSuccess, (state,action) => {
        return {...state,error:'',answers:action.answers}
    }),
    on(fromActions.getAnswersFail, (state,action) => {
        return {...state,answers:[], error:action.error}
    }),
    on(fromActions.getAnswerbyId, (state,action) => {
        return {...state,answerId:action.id}
    }),
    on(fromActions.addnewAnswerSuccess, (state, action) => {
        return { ...state, addError:'',addSuccess:action.message.message}
    }),
    on(fromActions.addnewAnswerFail,(state,action) => {
        return{...state,addError:action.error, addSuccess:''}
    }),
    on(fromActions.updateAnswerSuccess, (state,action) => {
        const updateanswer = state.answers.map(item=>{
            return item.aid === action.answer.aid?action.answer:item
        })
        return {...state, updateError:'',answers:updateanswer}
    }),
    on(fromActions.updateAnswerFail, (state,action) => {
        return {...state,updateError:action.error}
    })
)