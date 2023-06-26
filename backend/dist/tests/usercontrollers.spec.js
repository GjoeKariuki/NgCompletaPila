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
    vitest_1.test.skip("should login user with valid credentials", () => {
        return (0, supertest_1.default)(server_1.default).post('/users/login')
            .expect('Content-Type', /json/)
            .expect(200)
            .send({
            uemail: "jonathanndambuki16@gmail.com",
            upassword: "@krakenJO32?"
        })
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({
                message: vitest_1.expect.stringMatching('login successful!!')
            }));
        });
    });
    vitest_1.test.skip("should not login with invalid email", () => {
        return (0, supertest_1.default)(server_1.default).post('/users/login')
            .expect('Content-Type', /json/)
            .expect(404)
            .send({
            uemail: 'justany@gmail.com',
            upassword: '@krakenJO32?'
        })
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({
                message: vitest_1.expect.stringMatching('user email not found')
            }));
        });
    });
    vitest_1.test.skip("should not login with invalid password", () => {
        return (0, supertest_1.default)(server_1.default).post('/users/login')
            .expect('Content-Type', /json/)
            .expect(404)
            .send({
            uemail: "jonathanndambuki16@gmail.com",
            upassword: "@kra32?"
        })
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({
                message: vitest_1.expect.stringMatching('passwords do not match')
            }));
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
                    uemailSent: vitest_1.expect.any(Number),
                    uisDeleted: vitest_1.expect.any(Number)
                })
            ]));
        });
    }),
        vitest_1.test.skip("should get user by id", () => {
            return (0, supertest_1.default)(server_1.default).get('/users/id/8c132c4e-b238-481c-9eb5-26c8d578d751')
                .expect('Content-Type', /json/)
                .expect(200)
                .then((response) => {
                vitest_1.expect.objectContaining({
                    uemail: vitest_1.expect.any(String),
                    uemailSent: vitest_1.expect.any(Number),
                    uid: vitest_1.expect.any(String),
                    uisDeleted: vitest_1.expect.any(Number),
                    uname: vitest_1.expect.any(String),
                    upassword: vitest_1.expect.any(String),
                    uprofPic: vitest_1.expect.any(String),
                    urole: vitest_1.expect.any(String)
                });
            });
        });
    vitest_1.test.skip("should not get user with invalid ID", () => {
        return (0, supertest_1.default)(server_1.default).get('/users/id/8c132c4e-b238-481c-9eb5-2')
            .expect('Content-Type', /json/)
            .expect(404)
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({ message: vitest_1.expect.stringMatching('user not found.') }));
        });
    });
    vitest_1.test.skip("should get user with email", () => {
        return (0, supertest_1.default)(server_1.default).get(`/users/barittos?uzeremail='githaigageorge12@gmail.com'`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
            vitest_1.expect.objectContaining({
                uid: vitest_1.expect.any(String),
                uname: vitest_1.expect.any(String),
                uemail: vitest_1.expect.any(String),
                upassword: vitest_1.expect.any(String),
                urole: vitest_1.expect.any(String),
                uprofPic: vitest_1.expect.any(String),
                uemailSent: vitest_1.expect.any(String),
                uisDeleted: vitest_1.expect.any(String)
            });
        });
    });
    vitest_1.test.skip("should not get user with invalid email", () => {
        return (0, supertest_1.default)(server_1.default).get(`/users/barittos?uzeremail='gitsdf@gmail.com'`)
            .expect('Content-Type', /json/)
            .expect(404)
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({ message: vitest_1.expect.stringMatching('user not found. email is invalid') }));
        });
    });
    vitest_1.test.skip('should update user', () => {
        return (0, supertest_1.default)(server_1.default).put('/users/8c132c4e-b238-481c-9eb5-26c8d578d751')
            .expect('Content-Type', /json/)
            .expect(200)
            .send({
            uname: "David Jones Locker",
            uemail: "caribean@gmail.com",
            upassword: "@krakenJO32?",
            urole: "user",
            uprofPic: "personavatar.jpg"
        })
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({ message: vitest_1.expect.stringContaining('user records successfully updated') }));
        });
    });
    vitest_1.test.skip("should not update given invalid id", () => {
        return (0, supertest_1.default)(server_1.default).put('/users/jkdfdsk')
            .expect('Content-Type', /json/)
            .expect(404)
            .send({
            uname: "David Jones Locker",
            uemail: "caribean@gmail.com",
            upassword: "@krakenJO32?",
            urole: "user",
            uprofPic: "personavatar.jpg"
        })
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({ message: vitest_1.expect.stringMatching('ser not found. the user id is invalid') }));
        });
    });
    vitest_1.test.skip("should delete user given an email", () => {
        return (0, supertest_1.default)(server_1.default).delete('/users/jonathanndambuki16@gmail.com')
            .expect('Content-Type', /json/)
            .expect(200)
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI4YzEzMmM0ZS1iMjM4LTQ4MWMtOWViNS0yNmM4ZDU3OGQ3NTEiLCJ1bmFtZSI6IkpvaGhueSBEZWVwIiwidWVtYWlsIjoiZ2l0aGFpZ2FnZW9yZ2UxMkBnbWFpbC5jb20iLCJ1cm9sZSI6ImFkbWluIiwiaWF0IjoxNjg3NDI1MDc3LCJleHAiOjE2ODc0Mjg2Nzd9.Sfcva4heua02S_yl6qiGgeUXiU27HzK3NNZpnWFleR0')
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({
                message: vitest_1.expect.stringMatching('user successfully deleted')
            }));
        });
    });
    vitest_1.test.skip("should not delete a user without an admin token", () => {
        return (0, supertest_1.default)(server_1.default).delete('/users/BarbosaMich@gmail.com')
            .expect('Content-Type', /json/)
            .expect(401)
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({
                message: vitest_1.expect.stringMatching('unauthorized')
            }));
        });
    });
    vitest_1.test.skip("should not delete a user without a valid admin token", () => {
        return (0, supertest_1.default)(server_1.default).delete('/users/BarbosaMich@gmail.com')
            .expect('Content-Type', /json/)
            .expect(403)
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxZGMyZWMxYi1mMWZkLTQ2ZjQtOThhYi1hMTZhNjcyMGZkNzUiLCJ1bmFtZSI6IkNwdCBCYXJib3NhIiwidWVtYWlsIjoiY2FyaWJlYW40QGdtYWlsLmNvbSIsInVyb2xlIjoidXNlciIsImlhdCI6MTY4NzQyNTU0MiwiZXhwIjoxNjg3NDI5MTQyfQ.sCM1_6p5UXbh0ETf-1WSE3jTNDAX1AtbZJajjGulWws')
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({
                message: vitest_1.expect.stringMatching('access is denied')
            }));
        });
    });
    // test deleting user with invalid email
    vitest_1.test.skip("should not delete user with invalid email", () => {
        return (0, supertest_1.default)(server_1.default).delete('/users/justanyem@gmail.com')
            .expect('Content-Type', /json/)
            .expect(404)
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI4YzEzMmM0ZS1iMjM4LTQ4MWMtOWViNS0yNmM4ZDU3OGQ3NTEiLCJ1bmFtZSI6IkpvaGhueSBEZWVwIiwidWVtYWlsIjoiZ2l0aGFpZ2FnZW9yZ2UxMkBnbWFpbC5jb20iLCJ1cm9sZSI6ImFkbWluIiwiaWF0IjoxNjg3NDI1MDc3LCJleHAiOjE2ODc0Mjg2Nzd9.Sfcva4heua02S_yl6qiGgeUXiU27HzK3NNZpnWFleR0')
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({
                message: vitest_1.expect.stringMatching('user not found. email is invalid')
            }));
        });
    });
    // test for token
});
