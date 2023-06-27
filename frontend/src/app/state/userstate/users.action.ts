import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { addUser, iLoginSuccess, iLoginUser, iMessage, iUser } from "src/app/questions/questions.model";


export const UsersActionApI = createActionGroup(
    {
        source: 'UsersActionAPI',
        events: {
            "get users": emptyProps(),
            "get users success": props<{users:iUser[]}>(),
            "get users fail": props<{error:string}>(),
            "get user by id": props<{id:string}>(),
            "get user by email": props<{email:string}>(),
            "update user": props<{updateuser:addUser, id:string}>(),
            "update user success": props<{user:iUser}>(),
            "update user fail": props<{error:string}>(),
            "delete user": props<{id:string}>(),
            "delete user success": props<{message:iMessage}>(),
            "delete user fail": props<{error:string}>()
        }
    }
)

export const UsersPageActions = createActionGroup(
    {
        source:'Users Page Action',
        events: {
            "login user": props<{user:iLoginUser}>(),
            "login user success": props<{res:iLoginSuccess}>(),
            "login user fail": props<{error:string}>(),
            "register user": props<{user:addUser}>(),
            "register user successfull": props<{res:iMessage}>(),
            "register user fail": props<{error:string}>()
        }
    }
)