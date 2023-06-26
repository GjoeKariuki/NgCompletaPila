import { createFeatureSelector, createReducer, on } from "@ngrx/store"
import { iQuestion } from "src/app/questions/questions.model"
import { QuestionsAPIActions, QuestionsPageActions } from "./questions.actions"
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity"

// export interface QuestionsState extends EntityState<iQuestion>{
//     askquestionForm:boolean
//     answerquestionForm:boolean    
//     updatequestionForm:boolean
//     loading:boolean,
//     errorMessage:string
//     updateQuestion:iQuestion[]
//     showModal:boolean  
//     error:string
//     addSuccess:string
//     addError:string
//     updateError:string
//     deleteSuccess:string
//     deleteError:string
//     questionId: string
// }
export interface QuestionsState{
    askquestionForm:boolean
    answerquestionForm:boolean    
    updatequestionForm:boolean
    loading:boolean
    errorMessage:''
    updateQuestion:iQuestion[]
    showModal:boolean  
    error:string
    addSuccess:string
    addError:string
    updateError:string
    deleteSuccess:string
    deleteError:string
    questionId: string
    questions:iQuestion[]
}
// export const adapter:EntityAdapter<iQuestion> = createEntityAdapter<iQuestion>({selectId})
// export function selectId(question:iQuestion):string{
//     return question.qid
// }

const initialState:QuestionsState = {
    askquestionForm:false,
    answerquestionForm:false,
    updatequestionForm: false,
    loading:false,
    errorMessage:'',
    updateQuestion: [],
    showModal:false,
    error:'',
    addSuccess: '',
    addError: '',
    updateError:'',
    deleteError:'',
    deleteSuccess:'',
    questionId:'',
    questions: []
}



export const questionReducer=createReducer<QuestionsState>(
    initialState,
    on(QuestionsPageActions.toggleShowAnswersForm, (state) => (
        {...state,answerquestionForm:!state.answerquestionForm}
    )),
    on(QuestionsPageActions.toggleShowQuestionsForm, (state) => ({
        ...state, askquestionForm:!state.askquestionForm
    })),
    on(QuestionsPageActions.toggleShowUpdateQuestionsForm, (state, {newvalue}) => (
        {...state, updatequestionForm:newvalue}
    )),
    on(QuestionsPageActions.toggleShowModalView, (state) => (
        {...state, showModal:!state.showModal}
    )),
    on(QuestionsPageActions.loadQuestions, (state) => 
    ({...state, loading:true, errorMessage:''})),

    on(QuestionsAPIActions.passUpdateData, (state, { updateQuestion }) => ({
        ...state, updateQuestion:[updateQuestion]
    }) ),
    // ge
    // on(QuestionsAPIActions.questionsLoadedSuccess, (state,actions)=>
    // adapter.addMany(actions.questions, {...state, error:''})       
    // ),  
    on(QuestionsAPIActions.questionsLoadedSuccess, (state,actions)=>{
    return {...state,error:'',questions:actions.questions}    
    }),
    on(QuestionsAPIActions.questionsLoadedFail, (state,actions)=>
    {return {...state,error:actions.error,questions:[]} }       
     ),

     on(QuestionsAPIActions.loadSingleQuestionId,(state,actions)=>{
        return {...state,questionId:actions.id}}
    ),

    //  on(QuestionsPageActions.updateQuestion, (state,action) => 
    //  adapter.addOne(action.question,{...state}
    //  ))
    // on(QuestionsPageActions.updateQuestion, (state,action) => 
    //  {return {...state,addError:'',addSuccess:action.message}})

    //  on(QuestionsAPIActions.questionAddedSuccess, (state,actions)=>     
    //     adapter.addOne(actions.message.message,{...state, addError:'', addSuccess:actions.message.message})       
    //  ),
    on(QuestionsAPIActions.questionAddedSuccess, (state,actions)=>     
        {return {...state,addError:'',addSuccess:actions.message.message}}      
     ),

    on(QuestionsAPIActions.questionAddedFail, (state, actions) =>
    {return { ...state, addError: actions.error, addSuccess: '' }}
    ),

    // on(QuestionsAPIActions.questionUpdatedSuccess, (state, { update }) =>
    //     adapter.updateOne(update, { ...state, updateError: '' })
    // ),
    on(QuestionsAPIActions.questionUpdatedSuccess, (state,action) =>
       {
        const updated = state.questions.map(item => {
            return item.qid===action.question.qid ? action.question:item
        })
        return {...state,updateError:'',questions:updated}
       }
    ),

    on(QuestionsAPIActions.questionUpdatedFail, (state, action) =>
    {
        return {...state, updateError: action.error }}       
    ),
    //  on(QuestionsAPIActions.questionDeletedSuccess,(state,action)=>
    //  adapter.removeOne(action.message.message, {...state, deleteError:'',deleteSuccess:action.message.message })
    // ),
    on(QuestionsAPIActions.questionDeletedSuccess,(state,action)=>
        {return {...state,deleteError:'',deleteSuccess:action.message.message}}
    ),
     on(QuestionsAPIActions.questionDeletedFail,(state,action)=>
     ({...state, deleteError:action.error, deleteSuccess:''})
     )
)


// export const {selectAll, selectEntities} = adapter.getSelectors()
// export const selectQuestions = selectAll
// export const selectQuestionEntitites = selectEntities