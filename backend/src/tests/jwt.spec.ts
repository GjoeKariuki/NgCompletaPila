import  request  from "supertest"
import {describe,test,expect} from 'vitest'
import app from "../server"



describe("JWT Tokenizer tests", ()=>{

    test("should not allow expired JWT tokens", ()=>{
        return request(app).delete('/users/caribean@gmail.com')
        .expect(403)
        .expect('Content-Type', /json/)
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM1ZTBhM2ExLWYxYTctNGJhOS05MzY1LTg2NjIyOGYzMzM5ZSIsIm5hbWUiOiJKb2huIERvZSIsImVtYWlsIjoiam5kYW1idWtpdGVzdEBnbWFpbC5jb20iLCJpYXQiOjE2ODM3OTc5MDcsImV4cCI6MTY4NDE1NzkwN30.hUS5mpfgMaBvUehVSOBbzT4lVtXysoiOl6zW5L8n9bw')
        .then((response:request.Response) => {
            expect(response.body).toEqual(
                expect.objectContaining(
                    {message:expect.stringMatching('')}
                )
            )
        })
    })
})