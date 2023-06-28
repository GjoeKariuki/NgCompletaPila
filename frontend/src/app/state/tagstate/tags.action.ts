import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { addTag, iMessage, iTag } from "src/app/questions/questions.model";


export const getTags = createAction('[TAGS] - gettags')
export const getTagsbyQ = createAction('[TAGS] - get tags by question', props<{id:string}>())
export const getTagsSuccess = createAction('[TAGS] - gettagsSuccess', props<{tags:iTag[]}>())
export const getTagsbyQSuccess = createAction('[TAGS] - get tags by q success', props<{tags_question:iTag[]}>())
export const getTagsbyQFail = createAction('[TAGS] - get tags by q fail', props<{error:string}>())
export const getTagsFail = createAction('[TAGS] - gettagsFail', props<{error:string}>())
export const addTags = createAction('[TAGS] - addtags',props<{tag:addTag}>())
export const addTagsSuccess = createAction('[TAGS] - addtagsSuccess', props<{message:iMessage}>())
export const addTagsFail = createAction('[TAGS] - addtagsFail', props<{error:string}>())
export const getSingleTag = createAction('[TAGS] - getsingletag', props<{id:string}>())

