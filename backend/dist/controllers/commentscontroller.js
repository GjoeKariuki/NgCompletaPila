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
exports.updateComment = exports.getCommentsById = exports.getcommentsByAnswer = exports.getallComments = exports.createComments = void 0;
const uuid_1 = require("uuid");
const dbhelper_1 = require("../dbhelper");
// post comments
const createComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cid = (0, uuid_1.v4)();
        const { aid, cbody } = req.body;
        yield dbhelper_1.DbControllerHelpers.exec('postComment', { cid, aid, cbody });
        return res.status(201).json({ message: "comment successfully created" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.createComments = createComments;
const getallComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (true) {
            let comments = yield (yield dbhelper_1.DbControllerHelpers.exec('getallComments')).recordset;
            return res.status(200).json(comments);
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getallComments = getallComments;
// get comments
const getcommentsByAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let comment = (yield dbhelper_1.DbControllerHelpers.exec('getCommentAnswers', { aid: id })).recordset;
        if (!comment.length) {
            return res.status(404).json({ message: "answer id not valid" });
        }
        return res.status(200).json(comment);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getcommentsByAnswer = getcommentsByAnswer;
const getCommentsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let comment = (yield dbhelper_1.DbControllerHelpers.exec('getCommentsById', { cid: id })).recordset[0];
        if (comment) {
            return res.status(200).json(comment);
        }
        return res.status(404).json({ message: "id is invalid" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getCommentsById = getCommentsById;
//update
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let comment = (yield dbhelper_1.DbControllerHelpers.exec('getCommentsById', { cid: id })).recordset;
        if (!comment.length) {
            return res.status(404).json({ message: "comment not found by id" });
        }
        const { cbody } = req.body;
        yield dbhelper_1.DbControllerHelpers.exec('updateComment', { cid: id, cbody });
        return res.status(200).json({ message: "comment successfully updated" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.updateComment = updateComment;
