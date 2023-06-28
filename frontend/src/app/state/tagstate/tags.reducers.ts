import { createReducer, on } from "@ngrx/store"
import { iTag } from "src/app/questions/questions.model"
import * as tagactions from './tags.action'


export interface TagsInterface {
    tags: iTag[]
    tagId: string
    error: string
    addSuccess: string
    addError: string
    tags_question:iTag[]
    
}

const initialState:TagsInterface = {
    tags: [],
    tagId: '',
    error: '',
    addSuccess: '',
    addError: '',
    tags_question:[],
    
}

export const tagsReducer = createReducer<TagsInterface>(
    initialState,

    on(tagactions.getTagsSuccess, (state,action) => {
        return {...state,error:'',tags:action.tags}
    }),

    on(tagactions.getTagsbyQSuccess, (state,action) => {
        return {...state,error:'', tags_question:action.tags_question}
    }),
    on(tagactions.getTagsbyQFail, (state,action) => {
        return {...state, tags_question:[], error:action.error}
    }),
    on(tagactions.getTagsFail, (state,action) => {
        return {...state, tags:[], error:action.error}
    }),

    on(tagactions.getSingleTag, (state,action) => {
        return {...state,tagId:action.id}
    }),

    on(tagactions.addTagsSuccess, (state,action) => {
        return {...state,addError:'',addSuccess:action.message.message}
    }),

    on(tagactions.addTagsFail, (state,action) => {
        return {...state,addError:action.error, addSuccess:''}
    }),

    

)