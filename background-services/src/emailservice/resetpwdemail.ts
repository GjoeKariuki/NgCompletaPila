import mssql from 'mssql'
import {sqlConfig} from '../config'
import ejs from 'ejs'
import dotenv from 'dotenv'
import path from 'path'
import sendingMail from '../helpers/sendemail'


interface iUSER {
    uid:string
    uname:string
    uemail:string
    upassword:string
    urole:string
    uprofPic:string
    uemailSent:number
    uisDeleted:number
}


export const sendUserpwdResetEmail = async() => {}