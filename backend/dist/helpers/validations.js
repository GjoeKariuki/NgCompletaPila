"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.signupSchema = void 0;
const joi_1 = __importStar(require("joi"));
exports.signupSchema = joi_1.default.object({
    uname: joi_1.default.string().required().min(4),
    uemail: joi_1.default.string().required().email().min(10).messages({
        'string.empty': 'please add an email',
        'string.email': 'this is not a valid email'
    }),
    upassword: joi_1.default.string().required().pattern((new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$`))),
    confirmpassword: joi_1.default.equal((0, joi_1.ref)('upassword'))
});
exports.loginSchema = joi_1.default.object({
    uemail: joi_1.default.string().required().email().messages({
        'string.empty': "please add an email",
        'string.email': "this is not a valid email"
    }),
    upassword: joi_1.default.string().required()
});
