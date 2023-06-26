import cron from 'node-cron'
import express from 'express'
import { sendUserWelcomeEmail } from './emailservice/welcomemail';
import { sendUserpwdResetEmail } from './emailservice/resetpwdemail';


const app = express()


cron.schedule('*/5 * * * * *', async() => {
    console.log("'/5 * * * * *' runs every 5 seconds");
    await sendUserWelcomeEmail()
    await sendUserpwdResetEmail()
})

app.listen(4002, () => {
    console.log("Background-services is running");
    
})