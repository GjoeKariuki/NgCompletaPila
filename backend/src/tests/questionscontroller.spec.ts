import request from 'supertest'
import {describe,test,expect} from 'vitest'
import app from '../server'


describe("Questions Table API tests", () => {

    test.skip("should create a question", () => {
        return request(app).post('/questions')
        .expect('Content-Type', /json/)
        .expect(201)
        .send({
            uemail: "samuelndambuki401@gmail.com",
            qtitle: "How do i get started with python",
            qbody: "i just installed windows 10"
        })
        .then((response:request.Response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    message: expect.stringMatching('question successfully created')
                })
            )
        })
    })

    test.skip("should get all questions", () => {
        return request(app).get('/questions')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response:request.Response) => {
            expect(response.body).toStrictEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        qid:"fc8d2b2a-ccbd-4f37-bafe-0a24db0d2027",
                        uid: "ab12",
                        qtitle: "How do i get started with python",
                        qbody: "i just installed windows 10",
                        qisDeleted: 0,
                        qdatecreated: '2023-06-22'
                    })
                ])
            )
        })
    })

    test.skip("should get questions by qid", () => {
        return request(app).get('/questions/fc8d2b2a-ccbd-4f37-bafe-0a24db0d2027')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response:request.Response) => {
            expect.objectContaining({
                uid: "ab12",
                qtitle: "How do i get started with python",
                qbody: "i just installed windows 10",
                qisDeleted: 0,
                qdatecreated: '2023-06-22'
            })
        })
    })

    test.skip("should get questions by email", ()=> {
        return request(app).get('/questions/email/samuelndambuki401@gmail.com')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response:request.Response) => {
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        qid:expect.any(String),
                        uid: expect.any(String),
                        qtitle: expect.any(String),
                        qbody: expect.any(String),
                        qisDeleted: expect.any(Number),
                        qdatecreated: expect.any(String)
                    })
                ])
            )
        })
    })

    test.skip("should update question", ()=>{
        return request(app).put('/questions/fc8d2b2a-ccbd-4f37-bafe-0a24db0d2027')
        .expect('Content-Type', /json/)
        .expect(200)
        .send({
            qtitle: "How do i get started with python 2",
            qbody: "i just installed windows 7"
        })
        .then((response:request.Response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    message: expect.stringMatching('question successfully updated')
                })
            )
        })
    })

    test.skip("should not update question with wrong id", ()=> {
        return request(app).put('/questions/nsdanaskdsa')
        .expect('Content-Type', /json/)
        .expect(404)
        .send({
            qtitle: "How do i get started with python 2",
            qbody: "i just installed windows 7"
        })
        .then((response:request.Response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    message: expect.stringMatching('question not found. the id is invalid')
                })
            )
        })
    })

    // test("should not delete question with wrong id")
})







// qid:"fc8d2b2a-ccbd-4f37-bafe-0a24db0d2027",
// uid: "ab12",
// qtitle: "How do i get started with python",
// qbody: "i just installed windows 10",
// qisDeleted: 0,
// qdatecreated: '2023-06-22'