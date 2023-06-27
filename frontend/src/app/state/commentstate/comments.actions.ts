import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { addComments, iComments, iMessage } from "src/app/questions/questions.model";



export const CommentsAPIActions = createActionGroup(
    {
        source: "Comments API",
        events: {
            "getComments": emptyProps(),
            "get comments success": props<{comments:iComments[]}>(),
            "get comments fail": props<{error:string}>(),
            "get comments by aid": props<{id:string}>(),
            "get comment by id": props<{id:string}>(),
            "add comment": props<{newcomment:addComments}>(),
            "add comment success": props<{message:iMessage}>(),
            "add comment fail": props<{error:string}>(),
            "update comment": props<{updatecomment:addComments, id:string}>(),
            "update comment success": props<{comment:iComments}>(),
            "update comment fail": props<{error:string}>()
        }
    }
)