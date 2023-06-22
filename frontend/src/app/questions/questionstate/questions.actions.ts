import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Question } from "../questions.model";
import { Update } from "@ngrx/entity";


export const QuestionsPageActions = createActionGroup(
    {
        source: 'Questions page',
        events : {
            "toggle show questions form": emptyProps(),
            "toggle show modal view": emptyProps(),
            "toggle show update questions form": props<{newvalue:boolean}>(),
            'Load Questions': emptyProps(),
            "Add Question" : props<{question:Question }>(),
            'Update Question': props<{question:Question}>(),
            'Delete Question': props<{id:number}>()
        }
    }

)

export const QuestionsAPIActions = createActionGroup (
    {   source: 'Questions API',
        events: {
                    'Load Questions': emptyProps(),
                    'Pass Update Data': props<{updateQuestion:Question}>(),
                    'Questions Loaded Success' : props<{questions: Question[]}>(),
                    'Questions Loaded Fail' : props<{message:string}>(),
                    'Question Added Success' : props<{question:Question}>(),
                    'Question Added Fail' : props<{message:string}>(),
                    'Question Updated Success': props<{update: Update<Question>}>(),
                    'Question Updated Fail' : props<{message:string}>(),
                    'Question Deleted Success' : props<{id:number}>(),
                    'Question Deleted Fail' : props<{message:string}>()
    }}
)



