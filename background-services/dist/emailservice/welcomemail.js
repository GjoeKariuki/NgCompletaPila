"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendUserWelcomeEmail = void 0;
const mssql_1 = __importDefault(require("mssql"));
const config_1 = require("../config");
const ejs_1 = __importDefault(require("ejs"));
const sendemail_1 = __importDefault(require("../helpers/sendemail"));
const sendUserWelcomeEmail = () => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield mssql_1.default.connect(config_1.sqlConfig);
    const users = yield (yield pool.request().query('SELECT * FROM USERS WHERE uemailSent=0')).recordset;
    //console.log(users)
    for (let user of users) {
        ejs_1.default.renderFile('templates/welcome.ejs', { name: user.uname }, (err, html) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let messageopts = {
                    from: process.env.BG_EMAIL,
                    to: user.uemail,
                    subject: "Welcome To Socrates Q&A",
                    html
                };
                yield (0, sendemail_1.default)(messageopts);
                yield pool.request().query(`UPDATE USERS SET uemailSent=1 WHERE uid='${user.uid}'`);
            }
            catch (error) {
                console.log(error);
            }
        }));
    }
});
exports.sendUserWelcomeEmail = sendUserWelcomeEmail;
