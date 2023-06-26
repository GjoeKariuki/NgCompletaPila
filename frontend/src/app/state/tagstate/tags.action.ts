import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { addTag, iMessage, iTag } from "src/app/questions/questions.model";


export const getTags = createAction('[TAGS] - gettags')
export const getTagsSuccess = createAction('[TAGS] - gettagsSuccess', props<{tags:iTag[]}>())
export const getTagsFail = createAction('[TAGS] - gettagsFail', props<{error:string}>())
export const addTags = createAction('[TAGS] - addtags',props<{tag:addTag}>())
export const addTagsSuccess = createAction('[TAGS] - addtagsSuccess', props<{message:iMessage}>())
export const addTagsFail = createAction('[TAGS] - addtagsFail', props<{error:string}>())
export const getSingleTag = createAction('[TAGS] - getsingletag', props<{id:string}>())


// export const TagsAPIActions = createActionGroup(
//     {
//         source: 'Tags Page',
//         events: {
//             "gettags":emptyProps(),
//             ""
//         }
//     }
// )