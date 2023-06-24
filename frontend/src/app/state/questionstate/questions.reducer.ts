import { createReducer, on } from '@ngrx/store'
import { QuestionsAPIActions, QuestionsPageActions } from './questions.actions'
import { iQuestion } from '../../questions/questions.model'
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity'


export interface QuestionsState extends EntityState<iQuestion> {
    askquestionForm:boolean
    answerquestionForm:boolean
    loading: boolean
    errorMessage:string
    updatequestionForm:boolean
    updateQuestion:iQuestion[]
    showModal:boolean
  
}

export const adapter:EntityAdapter<iQuestion> = createEntityAdapter<iQuestion>({})

const initialState:QuestionsState = adapter.getInitialState({
    askquestionForm:false,
    answerquestionForm:false,
    loading:false,
    errorMessage: '',
    updatequestionForm: false,
    updateQuestion: [],
    showModal:false

})

export const questionsReducer = createReducer(

    initialState,

    // toggling form 
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
    on(QuestionsAPIActions.passUpdateData, (state, { updateQuestion }) => ({
        ...state, updateQuestion:[updateQuestion]
    }) ),
    // get questions array
    on(QuestionsPageActions.loadQuestions, (state) => 
    ({...state, loading:true, errorMessage:''})),
    // getting
    on(QuestionsAPIActions.questionsLoadedSuccess, (state, {questions}) => 
    adapter.addMany( questions, {...state, loading:false})),
    
    on(QuestionsAPIActions.questionsLoadedFail, (state, {message}) => 
    ({...state, errorMessage:message, loading:false})),

    on(QuestionsPageActions.addQuestion, (state) => 
    ({...state, loading:true, errorMessage:''})),
    
    on(QuestionsAPIActions.questionAddedSuccess, (state, {question}) => 
    adapter.addOne( question, {...state, loading:false})),

    on(QuestionsAPIActions.questionAddedFail, (state, {message}) => 
    ({...state, errorMessage:message, loading:false})),

    on(QuestionsPageActions.updateQuestion, (state) => 
    ({...state, loading:true, errorMessage:''})),
    
    on(QuestionsAPIActions.questionUpdatedSuccess, (state, { update }) => 
    adapter.updateOne(update, {...state, loading:false})),

    on(QuestionsAPIActions.questionUpdatedFail, (state, {message}) => 
    ({...state, errorMessage:message, loading:false})),

    on(QuestionsPageActions.deleteQuestion, (state) => 
    ({...state, loading:true, errorMessage:''})),
    
    on(QuestionsAPIActions.questionDeletedSuccess, (state, {id}) => 
    adapter.removeOne(id, {...state, loading:false})),

    on(QuestionsAPIActions.questionDeletedFail, (state, {message}) => 
    ({...state, errorMessage:message, loading:false}))
)


export const {selectAll, selectEntities} = adapter.getSelectors()
export const selectQuestions = selectAll
export const selectQuestionEntitites = selectEntities

