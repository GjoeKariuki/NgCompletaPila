import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAdminView from './adminview.reducers'
import { getRouterSelectors } from "@ngrx/router-store";

export const selectQuestionState = createFeatureSelector<fromAdminView.AdminViewState>('adminview')

export const selectAdminPreviousView = createSelector(selectQuestionState, (adminviewstate) => adminviewstate.adminpreviousview)
export const selectAdminLatestView = createSelector(selectQuestionState, (adminviewstate)=>adminviewstate.adminlatestview)


export const {selectRouteParams} = getRouterSelectors()
