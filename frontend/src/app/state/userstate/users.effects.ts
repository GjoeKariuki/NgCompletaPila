import { Injectable } from "@angular/core";
import { UsersActionApI, UsersPageActions } from "./users.action";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersService } from "src/app/services/users.service";
import { Router } from "@angular/router";
import { catchError, concatMap, map, mergeMap, of } from "rxjs";


@Injectable()
export class UsersEffects {

    ngrxOnInitEffects(){
        return UsersActionApI.getUsers()
    }

    loadusers$ = createEffect(() => 
        this.action$.pipe(ofType(UsersActionApI.getUsers),
        mergeMap(() => this.userservice.getallUsers().pipe(
            map((users) => UsersActionApI.getUsersSuccess({users})),
            catchError((error) => of(UsersActionApI.getUsersFail({error})))
        )))
    )

    adduser$ = createEffect(() => 
    this.action$.pipe(ofType(UsersPageActions.registerUser),
    mergeMap((action) => this.userservice.register(action.user).pipe(
        map((response) => UsersPageActions.registerUserSuccessfull({res:response})),
        catchError((error) => of(UsersPageActions.registerUserFail({error})))
    ))))

    updateuser$ = createEffect(() => 
    this.action$.pipe(ofType(UsersActionApI.updateUser),
    concatMap((action) => this.userservice.updateUser(action.id, action.updateuser).pipe(
        map((response) => UsersActionApI.updateUserSuccess({user:response})),
        catchError((error) => of(UsersActionApI.updateUserFail({error})))
    ))))

    deleteuser$ = createEffect(() => 
    this.action$.pipe(ofType(UsersActionApI.deleteUser),
    concatMap((action) => this.userservice.deleteUser(action.id).pipe(
        map((response) => UsersActionApI.deleteUserSuccess({message:response})),
        catchError((error) => of(UsersActionApI.deleteUserFail({error})))
    ))
    ))

    constructor(private action$:Actions, private userservice:UsersService, private router:Router) {}
}