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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuestion = exports.updateQuestion = exports.getquestionByEmail = exports.getquestionByQid = exports.getallQuestions = exports.createQuestion = void 0;
const uuid_1 = require("uuid");
const dbhelper_1 = require("../dbhelper");
// post question
const createQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (true) {
            let qid = (0, uuid_1.v4)();
            const { uemail, qtitle, qbody } = req.body;
            yield dbhelper_1.DbControllerHelpers.exec('postQuestion', { qid, uemail, qtitle, qbody });
            return res.status(201).json({ message: "question successfully created" });
        }
        //return res.status(404).json({message: "cannot create question"})
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.createQuestion = createQuestion;
// get questions 
const getallQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let questions = (yield dbhelper_1.DbControllerHelpers.exec('getAllQuestions')).recordset;
        return res.status(200).json(questions);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getallQuestions = getallQuestions;
const getquestionByQid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let question = (yield dbhelper_1.DbControllerHelpers.exec('getQuestionbyQid', { qid: id })).recordset[0];
        if (question) {
            return res.status(200).json(question);
        }
        return res.status(404).json({ message: "question not found. the id is invalid" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getquestionByQid = getquestionByQid;
const getquestionByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        let question = (yield dbhelper_1.DbControllerHelpers.exec('getQuestionbyEmail', { uemail: email })).recordset;
        if (question) {
            return res.status(200).json(question);
        }
        return res.status(404).json({ message: "question not found. the user email is invalid" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getquestionByEmail = getquestionByEmail;
// update question
const updateQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let question = (yield dbhelper_1.DbControllerHelpers.exec('getQuestionbyQid', { qid: id })).recordset;
        if (!question.length) {
            return res.status(404).json({ message: "question not found. the id is invalid" });
        }
        const { qtitle, qbody } = req.body;
        yield dbhelper_1.DbControllerHelpers.exec('updateQuestion', { qid: id, qtitle, qbody });
        return res.status(200).json({ message: "question successfully updated" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.updateQuestion = updateQuestion;
// delete question
const deleteQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.info && req.info.urole === 'admin') {
            const { id } = req.params;
            let question = (yield dbhelper_1.DbControllerHelpers.exec('getQuestionbyQid', { qid: id })).recordset;
            if (!question.length) {
                return res.status(404).json({ message: "question not found. qid is invalid" });
            }
            yield dbhelper_1.DbControllerHelpers.exec('deleteQuestion', { qid: id });
            return res.status(200).json({ message: "question successfully deleted" });
        }
        else {
            return res.status(403).json({ message: "access is denied" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.deleteQuestion = deleteQuestion;
