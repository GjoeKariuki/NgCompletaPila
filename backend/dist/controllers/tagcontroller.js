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
exports.getagById = exports.getallTags = exports.createTag = void 0;
const uuid_1 = require("uuid");
const dbhelper_1 = require("../dbhelper");
// post tag
const createTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tname } = req.body;
        for (let tn of tname) {
            let tid = (0, uuid_1.v4)();
            yield dbhelper_1.DbControllerHelpers.exec('postTag', { tid, tn });
        }
        return res.status(201).json({ message: "tag successfully created" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.createTag = createTag;
// get tag
const getallTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let tags = (yield dbhelper_1.DbControllerHelpers.exec('getallTags')).recordset;
        return res.status(200).json(tags);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getallTags = getallTags;
const getagById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let tag = (yield dbhelper_1.DbControllerHelpers.exec('getTagbyid', { tid: id })).recordset[0];
        return res.status(200).json(tag);
    }
    catch (error) {
    }
});
exports.getagById = getagById;
