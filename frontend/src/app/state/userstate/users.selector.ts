import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromReducer from './users.reducer'
import { getRouterSelectors } from "@ngrx/router-store";

export const selectUsersState = createFeatureSelector<fromReducer.UsersInterface>('users')
export const selectUsers = createSelector(selectUsersState, (userstate) => userstate.users)
const userId = createSelector(selectUsersState, (userstate) => userstate.userId)
export const useremail = createSelector(selectUsersState, (userstate) => userstate.userEmail)
export const selectSingleUserbyId = createSelector(selectUsers, userId, (state,id) => {
    return state.find(x => x.uid == id)
})
export const selectSingleUserbyEmail = createSelector(selectUsers, useremail, (state,email) => {
    return state.find(x => x.uemail==email)
})
export const selectName = createSelector(selectUsersState, (userstate) => userstate.userdata?.name)


export const {selectRouteParams} = getRouterSelectors()
