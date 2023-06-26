import mssql from 'mssql'
import {sqlConfig} from '../config'
import ejs from 'ejs'
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


export const sendUserWelcomeEmail = async() => {
    const pool = await mssql.connect(sqlConfig)
    const users:iUSER[] = await(await pool.request().query('SELECT * FROM USERS WHERE uemailSent=0')).recordset
    //console.log(users)

    for(let user of users){
        ejs.renderFile('templates/welcome.ejs', {name:user.uname}, async(err,html) => {
            try{
                let messageopts = {
                    from: process.env.BG_EMAIL,
                    to: user.uemail,
                    subject: "Welcome To Socrates Q&A",
                    html
                }
                await sendingMail(messageopts)
                await pool.request().query(`UPDATE USERS SET uemailSent=1 WHERE uid='${user.uid}'`)
            }
            catch(error){
                console.log(error)                
            }
        })
    }
}