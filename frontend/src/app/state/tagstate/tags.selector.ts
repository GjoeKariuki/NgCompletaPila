import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromTags from './tags.reducers'
import { getRouterSelectors } from "@ngrx/router-store";

export const selectTagState = createFeatureSelector<fromTags.TagsInterface>('tags')
export const selectTags = createSelector(selectTagState, (tagstate)=> tagstate.tags)
const tagid = createSelector(selectTagState, (tagstate) => tagstate.tagId)
export const selectSingleTag = createSelector(selectTags, tagid, (tagstate, id) => 
{   return tagstate.find(x => x.tid===id)})



export const {selectRouteParams} = getRouterSelectors()
