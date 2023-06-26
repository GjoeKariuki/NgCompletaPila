import  request  from "supertest"
import {describe,test,expect} from 'vitest'
import app from "../server"



describe("JWT Tokenizer tests", ()=>{

    test("should not allow expired JWT tokens", ()=>{
        return request(app).delete('/users/caribean@gmail.com')
        .expect(403)
        .expect('Content-Type', /json/)
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxZGMyZWMxYi1mMWZkLTQ2ZjQtOThhYi1hMTZhNjcyMGZkNzUiLCJ1bmFtZSI6IkNwdCBCYXJib3NhIiwidWVtYWlsIjoiY2FyaWJlYW40QGdtYWlsLmNvbSIsInVyb2xlIjoidXNlciIsImlhdCI6MTY4NzUxNzQ5NCwiZXhwIjoxNjg3NTE3NDk2fQ.Pdiq5UWkopq1fk1f2YA50ET1kV9s-m0-UIN-2_XJLVw')
        .then((response:request.Response) => {
            expect(response.body).toEqual(
                expect.objectContaining(
                    {message:expect.stringMatching('jwt expired')}
                )
            )
        })
    })
})