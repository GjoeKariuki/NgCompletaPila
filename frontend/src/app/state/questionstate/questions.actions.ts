import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { iQuestion } from "../../questions/questions.model";
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
            "Add Question" : props<{question:iQuestion }>(),
            'Update Question': props<{question:iQuestion}>(),
            'Delete Question': props<{id:number}>()
        }
    }

)

export const QuestionsAPIActions = createActionGroup (
    {   source: 'Questions API',
        events: {
                    'Load Questions': emptyProps(),
                    'Pass Update Data': props<{updateQuestion:iQuestion}>(),
                    'Questions Loaded Success' : props<{questions: iQuestion[]}>(),
                    'Questions Loaded Fail' : props<{message:string}>(),
                    'Question Added Success' : props<{question:iQuestion}>(),
                    'Question Added Fail' : props<{message:string}>(),
                    'Question Updated Success': props<{update: Update<iQuestion>}>(),
                    'Question Updated Fail' : props<{message:string}>(),
                    'Question Deleted Success' : props<{id:number}>(),
                    'Question Deleted Fail' : props<{message:string}>()
    }}
)



