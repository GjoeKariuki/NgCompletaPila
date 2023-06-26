import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path'


dotenv.config({path:path.resolve(__dirname, '../../.env')})




function createTransporter(configoptions:any){
    return nodemailer.createTransport(configoptions)
}


let configoptons = {
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    auth: {
        user: process.env.BG_EMAIL,
        pass: process.env.BG_PASSWORD
    }
}

const sendingMail = async(messageoptions:any)=>{
    let transporter = createTransporter(configoptons)
    // tests calls and authentication
    await transporter.verify((error,success) => {
        if(error)
            console.log(error)
        if(success)
            console.log("serve is ready to take our messages")        
            console.log(success)
            
    })
    await transporter.sendMail(messageoptions, (err, response) => {
        // if(response)
        //     console.log(response)
        if(err)
            console.log(err)       
        
    })
}
export default sendingMail