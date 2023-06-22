"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const vitest_1 = require("vitest");
const server_1 = __importDefault(require("../server"));
(0, vitest_1.describe)("SocratesDB Controllers tests", () => {
    vitest_1.test.skip("should register a user", () => {
        return (0, supertest_1.default)(server_1.default).post('/users')
            .expect('Content-Type', /json/)
            .expect(201)
            .send({
            uname: "Cpt Barbosa Mich",
            uemail: "BarbosaMich@gmail.com",
            upassword: "@krakenJO32?",
            confirmpassword: "@krakenJO32?"
        })
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({ message: vitest_1.expect.stringContaining("user successfully registered") }));
        });
    });
    vitest_1.test.skip("should get all users", () => {
        return (0, supertest_1.default)(server_1.default).get('/users')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.arrayContaining([
                vitest_1.expect.objectContaining({
                    uid: vitest_1.expect.any(String),
                    uname: vitest_1.expect.any(String),
                    uemail: vitest_1.expect.any(String),
                    upassword: vitest_1.expect.any(String),
                    urole: vitest_1.expect.any(String),
                    uprofPic: vitest_1.expect.any(String),
                    uemailSent: vitest_1.expect.any(String),
                    uisDeleted: vitest_1.expect.any(String)
                })
            ]));
        });
    });
    (0, vitest_1.test)("should get user by his id", () => {
        return (0, supertest_1.default)(server_1.default).get('/users/id/7ad0e4c2-cefd-4415-a145-61bbb49e635c')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.arrayContaining([
                vitest_1.expect.objectContaining({
                    uid: vitest_1.expect.any(String),
                    uname: vitest_1.expect.any(String),
                    uemail: vitest_1.expect.any(String),
                    upassword: vitest_1.expect.any(String),
                    urole: vitest_1.expect.any(String),
                    uprofPic: vitest_1.expect.any(String),
                    uemailSent: vitest_1.expect.any(Number),
                    uisDeleted: vitest_1.expect.any(Number)
                })
            ]));
        });
    });
});
