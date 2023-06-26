"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const vitest_1 = require("vitest");
const server_1 = __importDefault(require("../server"));
(0, vitest_1.describe)("JWT Tokenizer tests", () => {
    (0, vitest_1.test)("should not allow expired JWT tokens", () => {
        return (0, supertest_1.default)(server_1.default).delete('/users/caribean@gmail.com')
            .expect(403)
            .expect('Content-Type', /json/)
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxZGMyZWMxYi1mMWZkLTQ2ZjQtOThhYi1hMTZhNjcyMGZkNzUiLCJ1bmFtZSI6IkNwdCBCYXJib3NhIiwidWVtYWlsIjoiY2FyaWJlYW40QGdtYWlsLmNvbSIsInVyb2xlIjoidXNlciIsImlhdCI6MTY4NzUxNzQ5NCwiZXhwIjoxNjg3NTE3NDk2fQ.Pdiq5UWkopq1fk1f2YA50ET1kV9s-m0-UIN-2_XJLVw')
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({ message: vitest_1.expect.stringMatching('jwt expired') }));
        });
    });
});
