"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
exports.sqlConfig = {
    user: process.env.BG_USER,
    password: process.env.BG_PWD,
    database: process.env.BG_NAME,
    server: process.env.BG_HOST,
    pool: {
        max: 10, min: 0, idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        trustServiceCertificate: false
    }
};
console.log("Our DATABASE NAME is: ", process.env.BG_NAME);
