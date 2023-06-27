import { createReducer, on } from "@ngrx/store";
import { iComments } from "src/app/questions/questions.model";
import { CommentsAPIActions } from "./comments.actions";



export interface CommentsInterface {
 comments: iComments[]
 commentsId: string
 error:string
 addCommentSuccess:string
 addCommentFail:string
 updateCommenterror:string   
 answerId:string
}

const initialState:CommentsInterface = {
    comments:[],
    commentsId:'',
    answerId:'',
    error: '',
    addCommentSuccess:'',
    addCommentFail: '',
    updateCommenterror: ''
}


export const CommentsReducer = createReducer<CommentsInterface>(
    initialState,

    on(CommentsAPIActions.getCommentsSuccess, (state,action) => {
        return {...state,error:'',comments:action.comments}
    }),
    on(CommentsAPIActions.getCommentsFail, (state,action) => {
        return {...state, error:action.error, comments:[]}
    }),
    on(CommentsAPIActions.getCommentById, (state,action) => {
        return {...state, commentsId:action.id}
    }),
    on(CommentsAPIActions.getCommentsByAid, (state,action) => {
        return {...state, answerId:action.id}
    }),
    on(CommentsAPIActions.addCommentSuccess, (state,action) => {
        return {...state, addCommentSuccess:action.message.message, addCommentFail:''}
    }),
    on(CommentsAPIActions.addCommentFail, (state,action) => {
        return {...state,addCommentFail:action.error, addCommentSuccess:''}
    }),
    on(CommentsAPIActions.updateCommentSuccess, (state,action) => {
        const updatecomment = state.comments.map(item => {
            return item.cid === action.comment.cid?action.comment:item
        })
        return {...state,updateCommenterror:'',comments:updatecomment}
    }),
    on(CommentsAPIActions.updateCommentFail, (state,action) => {
        return {...state,updateCommenterror:action.error}
    }),

)