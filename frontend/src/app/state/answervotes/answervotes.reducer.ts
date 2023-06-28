import { createReducer, on } from "@ngrx/store";
import { iAnswerVotes } from "src/app/questions/questions.model";
import { AnswerVotesAPI } from "./answervotes.action";


export interface AnswerVotesInterface {
    answervotes: iAnswerVotes[]
    error:string
}

const initialState:AnswerVotesInterface = {
    answervotes: [],
    error: ''
}

export const AnswerVotesReducer = createReducer<AnswerVotesInterface>(
    initialState,

    on(AnswerVotesAPI.getAnswerVotesSuccess, (state,action) => {
        return {...state, error:'', answervotes:action.answervotes}
    }),

    on(AnswerVotesAPI.getAnswerVotesFail, (state,action) => {
        return {...state,error:action.error, answervotes:[]}
    }),
)