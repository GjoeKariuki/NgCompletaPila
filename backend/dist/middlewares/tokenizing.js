"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenize = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
const tokenize = (req, res, next) => {
    const token = req.headers['token'];
    try {
        if (!token) {
            return res.status(401).json({ message: 'unauthorized' });
        }
        const dedatoken = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        req.info = dedatoken;
    }
    catch (error) {
        return res.status(403).json({ message: error.message });
    }
    next();
};
exports.tokenize = tokenize;
