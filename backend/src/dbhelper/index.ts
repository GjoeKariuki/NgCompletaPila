import { sqlConfig } from "../config";
import mssql from 'mssql'


export class DbControllerHelpers {
    

    private static pool:Promise<mssql.ConnectionPool> = mssql.connect(sqlConfig)

    private static addsinpuTorequest(request:mssql.Request, data:{[x:string]:string|number} = {}){
        const keys = Object.keys(data)
        keys.map(keyname => {
            return request.input(keyname,data[keyname])
        })
        return request
    }

    static async exec(storedprocedure:string, data:{[x:string]:string|number} = {}){
        let request:mssql.Request = (await DbControllerHelpers.pool).request()
        request = DbControllerHelpers.addsinpuTorequest(request, data)
        return await request.execute(storedprocedure)
    }

    static async query(querystring:string){
        return (await DbControllerHelpers.pool).request().query(querystring)
    }

}