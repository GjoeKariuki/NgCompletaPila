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
exports.updateAnswer = exports.getanswerByQid = exports.getAnswersbyId = exports.getallAnswers = exports.createAnswer = void 0;
const uuid_1 = require("uuid");
const dbhelper_1 = require("../dbhelper");
// post answer
const createAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let aid = (0, uuid_1.v4)();
        const { qid, atitle, abody } = req.body;
        yield dbhelper_1.DbControllerHelpers.exec('postAnswer', { aid, qid, atitle, abody });
        return res.status(201).json({ message: "answer successfully created" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.createAnswer = createAnswer;
// get answers
const getallAnswers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let answers = (yield dbhelper_1.DbControllerHelpers.exec('getAllAnswers')).recordset;
        return res.status(200).json(answers);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getallAnswers = getallAnswers;
const getAnswersbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let answer = (yield dbhelper_1.DbControllerHelpers.exec('getAnswersbyId', { aid: id })).recordset[0];
        return res.status(200).json(answer);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getAnswersbyId = getAnswersbyId;
const getanswerByQid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let answer = (yield dbhelper_1.DbControllerHelpers.exec('getAnswersbyQid', { qid: id })).recordset;
        if (answer) {
            return res.status(200).json(answer);
        }
        return res.status(404).json({ message: "answer not found. the id is invalid" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getanswerByQid = getanswerByQid;
// update answer
const updateAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let answer = (yield dbhelper_1.DbControllerHelpers.exec('getAnswersbyId', { aid: id })).recordset;
        if (!answer.length) {
            return res.status(404).json({ message: "answer does not exists. check id" });
        }
        const { atitle, abody } = req.body;
        yield dbhelper_1.DbControllerHelpers.exec('updateAnswer', { aid: id, atitle, abody });
        return res.status(200).json({ message: "answer successfully updated " });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.updateAnswer = updateAnswer;
