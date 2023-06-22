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
exports.updateAnswerVotes = exports.getAnswerVotesbyid = exports.getAnswerVotesbyAid = exports.getAnswerVotes = exports.postAnswervotes = void 0;
const dbhelper_1 = require("../dbhelper");
const uuid_1 = require("uuid");
// post votes
const postAnswervotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let avid = (0, uuid_1.v4)();
        // const {id} = req.params
        const { aid, aupvotes, adownvotes, apreffered } = req.body;
        // console.log(req.body);
        yield dbhelper_1.DbControllerHelpers.exec('postAnswervotes', { aid, aupvotes, adownvotes, apreffered, avid });
        return res.status(201).json({ message: "answer votes successfully created" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.postAnswervotes = postAnswervotes;
// get votes
const getAnswerVotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let answervotes = (yield dbhelper_1.DbControllerHelpers.exec('getAnswerVotes')).recordset;
        if (answervotes) {
            return res.status(200).json(answervotes);
        }
        return res.status(404).json({ message: "no records found" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getAnswerVotes = getAnswerVotes;
const getAnswerVotesbyAid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let answervote = (yield dbhelper_1.DbControllerHelpers.exec('getAnswerVotesbyAid', { aid: id })).recordset;
        if (answervote) {
            return res.status(200).json(answervote);
        }
        return res.status(404).json({ message: "answer id is invalid" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getAnswerVotesbyAid = getAnswerVotesbyAid;
const getAnswerVotesbyid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let answervote = (yield dbhelper_1.DbControllerHelpers.exec('getAnswerVotesbyid', { avid: id })).recordset[0];
        if (answervote) {
            return res.status(200).json(answervote);
        }
        return res.status(404).json({ message: "answer vote id is invalid" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getAnswerVotesbyid = getAnswerVotesbyid;
// update votes
const updateAnswerVotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let answervote = (yield dbhelper_1.DbControllerHelpers.exec('getAnswerVotesbyid', { avid: id })).recordset[0];
        if (!answervote) {
            return res.status(404).json({ message: "answer vote not found.check its id" });
        }
        const { aid, aupvotes, adownvotes, apreffered } = req.body;
        yield dbhelper_1.DbControllerHelpers.exec('updateAnswerVotes', { avid: id, aid, aupvotes, adownvotes, apreffered });
        return res.status(200).json({ message: "answer vote successfully updated" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.updateAnswerVotes = updateAnswerVotes;
