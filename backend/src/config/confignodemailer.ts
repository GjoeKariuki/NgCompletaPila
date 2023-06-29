import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path'
import { log } from 'console'

dotenv.config({path:path.resolve(__dirname, '../../.env')})


let configurationOpts = {
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.SENDER_MAIL, 
        pass: process.env.GMAIL_PWD,
    }
}

function createTransporter(configurationOpts:any){
    return nodemailer.createTransport(configurationOpts)
}


export async function sendMail(messageOptions:any) {
    let transporter = createTransporter(configurationOpts)
    await transporter.sendMail(messageOptions, (err,res) => {
        console.log(err);
        
    })
}