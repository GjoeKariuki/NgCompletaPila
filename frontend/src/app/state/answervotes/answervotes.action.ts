import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { iAnswerVotes } from "src/app/questions/questions.model";


export const AnswerVotesAPI = createActionGroup(
    {
        source: 'Answers Votes API',
        events: {
            "get answer votes":emptyProps(),
            "get answer votes success":props<{answervotes:iAnswerVotes[]}>(),
            "get answer votes fail": props<{error:string}>()
        }
    }
)