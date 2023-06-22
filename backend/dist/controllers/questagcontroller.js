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
exports.getQuestiontagsbyId = exports.getallQuestionsTags = exports.createQuestionTag = void 0;
const dbhelper_1 = require("../dbhelper");
// post tag
const createQuestionTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { qid, tid } = req.body;
        yield dbhelper_1.DbControllerHelpers.exec('postQuestionTags', { qid, tid });
        return res.status(201).json({ message: "question tag successfully created" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.createQuestionTag = createQuestionTag;
// get all records
const getallQuestionsTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let questags = (yield dbhelper_1.DbControllerHelpers.exec('getQuestionTag')).recordset;
        return res.status(200).json(questags);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getallQuestionsTags = getallQuestionsTags;
const getQuestiontagsbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let qt = (yield dbhelper_1.DbControllerHelpers.exec('getQuestionTagbyQid', { qid: id })).recordset[0];
        if (!qt) {
            return res.status(404).json({ message: 'does not exist' });
        }
        return res.status(200).json(qt);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getQuestiontagsbyId = getQuestiontagsbyId;
