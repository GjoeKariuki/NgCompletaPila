import request from 'supertest'
import {describe,test,expect} from 'vitest'
import app from '../server'




describe("SocratesDB Controllers tests", () => {

    test.skip("should register a user", () => {
        return request(app).post('/users')
        .expect('Content-Type', /json/)
        .expect(201)
        .send(
            {
                uname: "Cpt Barbosa Mich",
                uemail: "BarbosaMich@gmail.com",
                upassword: "@krakenJO32?",
                confirmpassword: "@krakenJO32?"
            }
        )
        .then((response:request.Response) => {
            expect(response.body).toEqual(
                expect.objectContaining(
                    {message:expect.stringContaining("user successfully registered")}
                )
            )
        })
    })

    
    test.skip("should login user with valid credentials", () => {
        return request(app).post('/users/login')
        .expect('Content-Type', /json/)
        .expect(200)
        .send({
            uemail: "jonathanndambuki16@gmail.com",
            upassword: "@krakenJO32?"
        })
        .then((response:request.Response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    message: expect.stringMatching('login successful!!')
                })
                
            )
        })
    })

    test.skip("should not login with invalid email", ()=> {
        return request(app).post('/users/login')
        .expect('Content-Type', /json/)
        .expect(404)
        .send({
            uemail:'justany@gmail.com',
            upassword: '@krakenJO32?'
        })
        .then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    message: expect.stringMatching('user email not found')
                })
            )
        })
    })

    test.skip("should not login with invalid password", ()=> {
        return request(app).post('/users/login')
        .expect('Content-Type', /json/)
        .expect(404)
        .send({
            uemail: "jonathanndambuki16@gmail.com",
            upassword: "@kra32?"
        })
        .then((response:request.Response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    message: expect.stringMatching('passwords do not match')
                })
            )
        })
    })


    test.skip("should get all users", () => {
        return request(app).get('/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response:request.Response) => {
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        uid:expect.any(String),
                        uname:expect.any(String),
                        uemail:expect.any(String),
                        upassword:expect.any(String),
                        urole:expect.any(String),
                        uprofPic:expect.any(String),
                        uemailSent:expect.any(Number), 
                        uisDeleted:expect.any(Number)
                    })
                ])
            )
           
        })
    }),
    
    

    test.skip("should get user by id", () => {
        return request(app).get('/users/id/8c132c4e-b238-481c-9eb5-26c8d578d751')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response:request.Response)=>{
    
                expect.objectContaining({
                    uemail:expect.any(String),
                    uemailSent:expect.any(Number), 
                    uid:expect.any(String),
                    uisDeleted:expect.any(Number),
                    uname:expect.any(String),                    
                    upassword:expect.any(String),
                    uprofPic:expect.any(String),
                    urole:expect.any(String)                   
                    
                })
            
        })
    })

    test.skip("should not get user with invalid ID", () => {
        return request(app).get('/users/id/8c132c4e-b238-481c-9eb5-2')
        .expect('Content-Type', /json/)
        .expect(404)
        .then((response:request.Response) => {
            expect(response.body).toEqual(
                expect.objectContaining(
                    {   message: expect.stringMatching('user not found.')}
                )
            )
        })
    })

    test.skip("should get user with email", ()=> {
        return request(app).get(`/users/barittos?uzeremail='githaigageorge12@gmail.com'`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response:request.Response) => {
            
                expect.objectContaining(
                    {
                        uid:expect.any(String),
                        uname:expect.any(String),
                        uemail:expect.any(String),
                        upassword:expect.any(String),
                        urole:expect.any(String),
                        uprofPic:expect.any(String),
                        uemailSent:expect.any(String), 
                        uisDeleted:expect.any(String)
                    }
                )
            
        })
    })

    test.skip("should not get user with invalid email", ()=> {
        return request(app).get(`/users/barittos?uzeremail='gitsdf@gmail.com'`)
        .expect('Content-Type', /json/)
        .expect(404)
        .then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.objectContaining(
                    {   message:expect.stringMatching('user not found. email is invalid')}
                )
            )
            
        })
    })

    test.skip('should update user', () => {
        return request(app).put('/users/8c132c4e-b238-481c-9eb5-26c8d578d751')
        .expect('Content-Type', /json/)
        .expect(200)
        .send({
                uname: "David Jones Locker",
                uemail: "caribean@gmail.com",
                upassword: "@krakenJO32?",
                urole: "user",
                uprofPic: "personavatar.jpg"
        })
        .then((response:request.Response) => {
            expect(response.body).toEqual(
                expect.objectContaining(
                    {   message:expect.stringContaining('user records successfully updated')}
                )
            )
        })
    })

    test.skip("should not update given invalid id", () => {
        return request(app).put('/users/jkdfdsk')
        .expect('Content-Type', /json/)
        .expect(404)
        .send({
                uname: "David Jones Locker",
                uemail: "caribean@gmail.com",
                upassword: "@krakenJO32?",
                urole: "user",
                uprofPic: "personavatar.jpg"
        })
        .then((response:request.Response) => {
            expect(response.body).toEqual(
                expect.objectContaining(
                    {   message:expect.stringMatching('ser not found. the user id is invalid')}
                )
            )
        })
    })

    
    test.skip("should delete user given an email", ()=>{
        return request(app).delete('/users/jonathanndambuki16@gmail.com')
        .expect('Content-Type', /json/)
        .expect(200)
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI4YzEzMmM0ZS1iMjM4LTQ4MWMtOWViNS0yNmM4ZDU3OGQ3NTEiLCJ1bmFtZSI6IkpvaGhueSBEZWVwIiwidWVtYWlsIjoiZ2l0aGFpZ2FnZW9yZ2UxMkBnbWFpbC5jb20iLCJ1cm9sZSI6ImFkbWluIiwiaWF0IjoxNjg3NDI1MDc3LCJleHAiOjE2ODc0Mjg2Nzd9.Sfcva4heua02S_yl6qiGgeUXiU27HzK3NNZpnWFleR0')
        .then((response:request.Response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    message:expect.stringMatching('user successfully deleted')
                })
            )
        })
    })

    test.skip("should not delete a user without an admin token", ()=>{
        return request(app).delete('/users/BarbosaMich@gmail.com')
        .expect('Content-Type', /json/)
        .expect(401)        
        .then((response:request.Response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    message:expect.stringMatching('unauthorized')
                })
            )
        })
    })

    test.skip("should not delete a user without a valid admin token", ()=>{
        return request(app).delete('/users/BarbosaMich@gmail.com')
        .expect('Content-Type', /json/)
        .expect(403)  
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxZGMyZWMxYi1mMWZkLTQ2ZjQtOThhYi1hMTZhNjcyMGZkNzUiLCJ1bmFtZSI6IkNwdCBCYXJib3NhIiwidWVtYWlsIjoiY2FyaWJlYW40QGdtYWlsLmNvbSIsInVyb2xlIjoidXNlciIsImlhdCI6MTY4NzQyNTU0MiwiZXhwIjoxNjg3NDI5MTQyfQ.sCM1_6p5UXbh0ETf-1WSE3jTNDAX1AtbZJajjGulWws')     
        .then((response:request.Response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    message:expect.stringMatching('access is denied')
                })
            )
        })
    })

    // test deleting user with invalid email
    test.skip("should not delete user with invalid email", ()=> {
        return request(app).delete('/users/justanyem@gmail.com')
        .expect('Content-Type', /json/)
        .expect(404)
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI4YzEzMmM0ZS1iMjM4LTQ4MWMtOWViNS0yNmM4ZDU3OGQ3NTEiLCJ1bmFtZSI6IkpvaGhueSBEZWVwIiwidWVtYWlsIjoiZ2l0aGFpZ2FnZW9yZ2UxMkBnbWFpbC5jb20iLCJ1cm9sZSI6ImFkbWluIiwiaWF0IjoxNjg3NDI1MDc3LCJleHAiOjE2ODc0Mjg2Nzd9.Sfcva4heua02S_yl6qiGgeUXiU27HzK3NNZpnWFleR0')
        .then((response:request.Response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    message: expect.stringMatching('user not found. email is invalid')
                })
            )
        })
    })

    // test for token
})