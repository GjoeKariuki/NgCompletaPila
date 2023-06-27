import { createReducer, on } from "@ngrx/store";
import { iLoginSuccess, iUser } from "src/app/questions/questions.model";
import { UsersActionApI, UsersPageActions } from "./users.action";


export interface UsersInterface {
    users:iUser[]
    userId:string
    userEmail:string
    error:string
    adduserSuccess:string
    adduserFail:string
    updateuserError:string
    deleteuserSuccess:string
    deleteuserError:string,
    userdata:iLoginSuccess|null
    regiseruserSuccess:string
    registeruserFail:string
}

const initialState:UsersInterface = {
    userEmail:'',
    userId:'',
    users:[],
    error:'',
    adduserFail:'',
    adduserSuccess:'',
    updateuserError:'',
    deleteuserSuccess:'',
    deleteuserError:'',
    userdata:null,
    regiseruserSuccess:'',
    registeruserFail:''
}


export const usersReducer = createReducer<UsersInterface>(
    initialState, 

    on(UsersPageActions.loginUserSuccess, (state,action) => {
        return {...state,error:'',userdata:action.res}
    }),

    on(UsersPageActions.loginUserFail, (state,action) => {
        return {...state, error:action.error, userdata:null}
    }),

    on(UsersPageActions.registerUserSuccessfull, (state,action) => {
        return {...state,regiseruserSuccess:action.res.message, registeruserFail:''}
    }),

    on(UsersPageActions.registerUserFail, (state,action) => {
        return {...state, regiseruserSuccess:'', registeruserFail:action.error}
    }), 

    on(UsersActionApI.getUsersSuccess, (state,action) => {
        return {...state,error:'',users:action.users}
    }),

    on(UsersActionApI.getUsersFail, (state,action) => {
        return {...state,error:action.error, users:[]}
    }),

    on(UsersActionApI.getUserById, (state,action) => {
        return {...state,userId:action.id}
    }),

    on(UsersActionApI.getUserByEmail, (state,action) => {
        return {...state,userEmail:action.email}
    }),

    on(UsersActionApI.updateUserSuccess, (state,action) => {
        const user = state.users.map(item => {
            return item.uid === action.user.uid?action.user:item
        })
        return {...state, updateuserError:'',users:user}
    }),

    on(UsersActionApI.updateUserFail,(state,action) => {
        return {...state,updateuserError:action.error}
    }),

    on(UsersActionApI.deleteUserSuccess, (state,action) => {
        return {...state, deleteuserError:'', deleteuserSuccess:action.message.message}
    }),

    on(UsersActionApI.deleteUserFail, (state,action) => {
        return {...state, deleteuserSuccess:'',deleteuserError:action.error}
    })
)