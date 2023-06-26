import { createReducer, on } from "@ngrx/store"
import { AdminViewActions } from "./adminview.actions"


export interface AdminViewState {
    adminlatestview:boolean
    adminpreviousview:boolean
}

const initialState:AdminViewState = {
    adminlatestview:true,
    adminpreviousview:false,
}

export const adminViewreducer = createReducer(
    initialState, 
    // toggling form 
    on(AdminViewActions.toggleAdminLatestView, (state) => (
        {...state,adminlatestview:!state.adminlatestview}
    )),
    on(AdminViewActions.toggleAdminPreviousView, (state)=> (
        {...state,adminpreviousview:!state.adminpreviousview}
    ))
)