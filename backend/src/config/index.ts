import dotenv from 'dotenv'
import path from 'path'
import sql from 'mssql'


dotenv.config({path:path.resolve(__dirname, '../../.env')})

export const sqlConfig = {

    server: <string>process.env.DB_HOST,
    user: <string>process.env.DB_USER,
    password: <string>process.env.DB_PWD,
    database: <string>process.env.DB_NAME,
    pool: {max:10, min:0, idleTimeoutMillis:30000},
    options: {encrypt:false, trustServerCertificate:false}
}

sql.connect(sqlConfig).then(pool => {
    if(pool.connected){
        console.log("server and db ready")        
    }
})