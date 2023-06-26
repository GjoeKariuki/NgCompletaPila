import dotenv from 'dotenv'
import path from 'path'


dotenv.config({path: path.resolve(__dirname, '../../.env')})

export const sqlConfig = {
    user:<string>process.env.BG_USER,
    password:<string>process.env.BG_PWD,
    database: <string>process.env.BG_NAME,
    server: <string>process.env.BG_HOST,
    pool: {
        max:10, min:0,idleTimeoutMillis:30000
    },
    options: {
        encrypt: false,
        trustServiceCertificate:false
    }

}

console.log("Our DATABASE NAME is: ", process.env.BG_NAME);
