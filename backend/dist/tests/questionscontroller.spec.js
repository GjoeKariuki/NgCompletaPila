"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const vitest_1 = require("vitest");
const server_1 = __importDefault(require("../server"));
(0, vitest_1.describe)("Questions Table API tests", () => {
    vitest_1.test.skip("should create a question", () => {
        return (0, supertest_1.default)(server_1.default).post('/questions')
            .expect('Content-Type', /json/)
            .expect(201)
            .send({
            uemail: "samuelndambuki401@gmail.com",
            qtitle: "How do i get started with python",
            qbody: "i just installed windows 10"
        })
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({
                message: vitest_1.expect.stringMatching('question successfully created')
            }));
        });
    });
    vitest_1.test.skip("should get all questions", () => {
        return (0, supertest_1.default)(server_1.default).get('/questions')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
            (0, vitest_1.expect)(response.body).toStrictEqual(vitest_1.expect.arrayContaining([
                vitest_1.expect.objectContaining({
                    qid: "fc8d2b2a-ccbd-4f37-bafe-0a24db0d2027",
                    uid: "ab12",
                    qtitle: "How do i get started with python",
                    qbody: "i just installed windows 10",
                    qisDeleted: 0,
                    qdatecreated: '2023-06-22'
                })
            ]));
        });
    });
    vitest_1.test.skip("should get questions by qid", () => {
        return (0, supertest_1.default)(server_1.default).get('/questions/fc8d2b2a-ccbd-4f37-bafe-0a24db0d2027')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
            vitest_1.expect.objectContaining({
                uid: "ab12",
                qtitle: "How do i get started with python",
                qbody: "i just installed windows 10",
                qisDeleted: 0,
                qdatecreated: '2023-06-22'
            });
        });
    });
    vitest_1.test.skip("should get questions by email", () => {
        return (0, supertest_1.default)(server_1.default).get('/questions/email/samuelndambuki401@gmail.com')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.arrayContaining([
                vitest_1.expect.objectContaining({
                    qid: vitest_1.expect.any(String),
                    uid: vitest_1.expect.any(String),
                    qtitle: vitest_1.expect.any(String),
                    qbody: vitest_1.expect.any(String),
                    qisDeleted: vitest_1.expect.any(Number),
                    qdatecreated: vitest_1.expect.any(String)
                })
            ]));
        });
    });
    vitest_1.test.skip("should update question", () => {
        return (0, supertest_1.default)(server_1.default).put('/questions/fc8d2b2a-ccbd-4f37-bafe-0a24db0d2027')
            .expect('Content-Type', /json/)
            .expect(200)
            .send({
            qtitle: "How do i get started with python 2",
            qbody: "i just installed windows 7"
        })
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({
                message: vitest_1.expect.stringMatching('question successfully updated')
            }));
        });
    });
    vitest_1.test.skip("should not update question with wrong id", () => {
        return (0, supertest_1.default)(server_1.default).put('/questions/nsdanaskdsa')
            .expect('Content-Type', /json/)
            .expect(404)
            .send({
            qtitle: "How do i get started with python 2",
            qbody: "i just installed windows 7"
        })
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({
                message: vitest_1.expect.stringMatching('question not found. the id is invalid')
            }));
        });
    });
    // test("should not delete question with wrong id")
});
// qid:"fc8d2b2a-ccbd-4f37-bafe-0a24db0d2027",
// uid: "ab12",
// qtitle: "How do i get started with python",
// qbody: "i just installed windows 10",
// qisDeleted: 0,
// qdatecreated: '2023-06-22'
