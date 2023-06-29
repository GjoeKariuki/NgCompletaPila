import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { addQuestion, iQuestion,iMessage } from "../../questions/questions.model";
import { Update } from "@ngrx/entity";




export const QuestionsPageActions = createActionGroup(
    {
        source: 'Questions page',
        events : {            
            "toggle show answers form": emptyProps(),
            "toggle show questions form": emptyProps(),
            "toggle show modal view": emptyProps(),
            "toggle show update questions form": props<{newvalue:boolean}>(),
            'Load Questions': emptyProps(),
            "Add Question" : props<{question:addQuestion }>(),
            'Update Question': props<{id:string,question:addQuestion}>(),
            'Delete Question': props<{id:string}>()
        }
    }
)

 
export const QuestionsAPIActions = createActionGroup (
    {   source: 'Questions API',
        events: {
                    'Load Questions': emptyProps(),
                    'Load single question id': props<{id:string}>(), //
                    'Pass Update Data': props<{updateQuestion:iQuestion}>(),
                    'Questions Loaded Success' : props<{questions: iQuestion[]}>(),
                    'Questions Loaded Fail' : props<{error:string}>(),
                    'Question Added Success' : props<{message:iMessage}>(),//
                    'Question Added Fail' : props<{error:string}>(),
                    'Question update': props<{updatequestion:addQuestion, id:string}>(),
                    'Question Updated Success': props<{question:iQuestion}>(),
                    'Question Updated Fail' : props<{error:string}>(),
                    'Question Deleted Success' : props<{message:iMessage}>(), //
                    'Question Deleted Fail' : props<{error:string}>()
    }}
)

// 'Question Updated Success': props<{update: Update<iQuestion>}>(),


