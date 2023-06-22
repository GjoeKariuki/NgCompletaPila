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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const useroutes_1 = __importDefault(require("./routes/useroutes"));
const questionroutes_1 = __importDefault(require("./routes/questionroutes"));
const answeroutes_1 = __importDefault(require("./routes/answeroutes"));
const tagroutes_1 = __importDefault(require("./routes/tagroutes"));
const questiontagroutes_1 = __importDefault(require("./routes/questiontagroutes"));
const commentsroutes_1 = __importDefault(require("./routes/commentsroutes"));
const answervotesroutes_1 = __importDefault(require("./routes/answervotesroutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, express_1.json)());
app.use('/users', useroutes_1.default);
app.use('/questions', questionroutes_1.default);
app.use('/answers', answeroutes_1.default);
app.use('/tags', tagroutes_1.default);
app.use('/questiontags', questiontagroutes_1.default);
app.use('/comments', commentsroutes_1.default);
app.use('/answer-votes', answervotesroutes_1.default);
app.listen(8080, () => {
    console.log("running part 2");
});
exports.default = app;
