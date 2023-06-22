import request from 'supertest'
import {describe,test,expect} from 'vitest'
import app from '../server'



describe("Answer table API tests", ()=> {
    
    test.skip("should create an answer", () => {
        return request(app).post('/answers')
        .expect('Content-Type', /json/)
        .expect(201)
        .send({
            qid: "fc8d2b2a-ccbd-4f37-bafe-0a24db0d2027",
            atitle: "go to their website 'www.python.org",
            abody: "download the setup and read their documentation"
        })
        .then((response:request.Response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    message: expect.stringMatching('answer successfully created')
                })
            )
        })
    })

    test.skip("should get all answers", () => {
        return request(app).get('/answers')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response:request.Response) => {
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        abody: expect.any(String),
                        adateanswered: expect.any(String),
                        aid: expect.any(String),
                        aisDeleted: expect.any(String),
                        atitle: expect.any(String),
                        qid: expect.any(String),
                        uid: expect.any(String)                        
                        
                    })
                ])
            )
        })
    })

    test.skip("should get answer by answerid", ()=> {
        return request(app).get('/answers/aid/19cca528-5dbc-4765-93ed-a4ae0f68a8f4')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response:request.Response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    abody: expect.any(String),
                    adateanswered: expect.any(String),
                    aid: expect.any(String),
                    aisDeleted: expect.any(String),
                    atitle: expect.any(String),
                    qid: expect.any(String),
                    uid: expect.any(String)  
                })
            )
            
        })
    })

    test.skip("should get answer by questionid", ()=> {
        return request(app).get('/answers/qid/fc8d2b2a-ccbd-4f37-bafe-0a24db0d2027')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response:request.Response) => {
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        abody: expect.any(String),
                        adateanswered: expect.any(String),
                        aid: expect.any(String),
                        aisDeleted: expect.any(String),
                        atitle: expect.any(String),
                        qid: expect.any(String),
                        uid: expect.any(String)  
                    })
                ])
            )
            
        })
    })

    // test.skip("should update answer", ()=> {
    //     return request(app).put()
    // })
})