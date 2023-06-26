"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const vitest_1 = require("vitest");
const server_1 = __importDefault(require("../server"));
(0, vitest_1.describe)("Answer table API tests", () => {
    (0, vitest_1.test)("should create an answer", () => {
        return (0, supertest_1.default)(server_1.default).post('/answers')
            .expect('Content-Type', /json/)
            .expect(201)
            .send({
            qid: "fc8d2b2a-ccbd-4f37-bafe-0a24db0d2027",
            atitle: "go to their website 'www.python.org",
            abody: "download the setup and read their documentation"
        })
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({
                message: vitest_1.expect.stringMatching('answer successfully created')
            }));
        });
    });
    (0, vitest_1.test)("should get all answers", () => {
        return (0, supertest_1.default)(server_1.default).get('/answers')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.arrayContaining([
                vitest_1.expect.objectContaining({
                    abody: vitest_1.expect.any(String),
                    adateanswered: vitest_1.expect.any(String),
                    aid: vitest_1.expect.any(String),
                    aisDeleted: vitest_1.expect.any(String),
                    atitle: vitest_1.expect.any(String),
                    qid: vitest_1.expect.any(String),
                    uid: vitest_1.expect.any(String)
                })
            ]));
        });
    });
    (0, vitest_1.test)("should get answer by answerid", () => {
        return (0, supertest_1.default)(server_1.default).get('/answers/aid/19cca528-5dbc-4765-93ed-a4ae0f68a8f4')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({
                abody: vitest_1.expect.any(String),
                adateanswered: vitest_1.expect.any(String),
                aid: vitest_1.expect.any(String),
                aisDeleted: vitest_1.expect.any(String),
                atitle: vitest_1.expect.any(String),
                qid: vitest_1.expect.any(String),
                uid: vitest_1.expect.any(String)
            }));
        });
    });
    (0, vitest_1.test)("should get answer by questionid", () => {
        return (0, supertest_1.default)(server_1.default).get('/answers/qid/fc8d2b2a-ccbd-4f37-bafe-0a24db0d2027')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.arrayContaining([
                vitest_1.expect.objectContaining({
                    abody: vitest_1.expect.any(String),
                    adateanswered: vitest_1.expect.any(String),
                    aid: vitest_1.expect.any(String),
                    aisDeleted: vitest_1.expect.any(String),
                    atitle: vitest_1.expect.any(String),
                    qid: vitest_1.expect.any(String),
                    uid: vitest_1.expect.any(String)
                })
            ]));
        });
    });
    // test.skip("should update answer", ()=> {
    //     return request(app).put()
    // })
});
