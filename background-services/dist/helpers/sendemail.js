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
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
function createTransporter(configoptions) {
    return nodemailer_1.default.createTransport(configoptions);
}
let configoptons = {
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    auth: {
        user: process.env.BG_EMAIL,
        pass: process.env.BG_PASSWORD
    }
};
const sendingMail = (messageoptions) => __awaiter(void 0, void 0, void 0, function* () {
    let transporter = createTransporter(configoptons);
    // tests calls and authentication
    yield transporter.verify((error, success) => {
        if (error)
            console.log(error);
        if (success)
            console.log("serve is ready to take our messages");
        console.log(success);
    });
    yield transporter.sendMail(messageoptions, (err, response) => {
        // if(response)
        //     console.log(response)
        if (err)
            console.log(err);
    });
});
exports.default = sendingMail;
