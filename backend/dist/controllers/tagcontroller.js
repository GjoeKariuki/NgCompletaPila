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
exports.deleteQuestionTags = exports.getagById = exports.getTagsbyQid = exports.getallTags = exports.createTag = void 0;
const uuid_1 = require("uuid");
const dbhelper_1 = require("../dbhelper");
// post tag
const createTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tname, qid } = req.body;
        //const {error} = tagSchema.validate(req.body)
        // if(error){
        //     return res.status(422).json(error.details[0].message)
        // }
        console.log(req.body);
        if (typeof (tname) == 'object') {
            for (let tn of tname) {
                let tid = (0, uuid_1.v4)();
                yield dbhelper_1.DbControllerHelpers.exec('postTag', { tid, tn, qid });
            }
        }
        else if (typeof (tname) == 'string') {
            let tid = (0, uuid_1.v4)();
            let tn = tname;
            yield dbhelper_1.DbControllerHelpers.exec('postTag', { tid, tn, qid });
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
const getTagsbyQid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let tags = (yield dbhelper_1.DbControllerHelpers.exec('gettagByQid', { qid: id })).recordset;
        return res.status(200).json(tags);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getTagsbyQid = getTagsbyQid;
const getagById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let tag = (yield dbhelper_1.DbControllerHelpers.exec('getTagbyid', { tid: id })).recordset[0];
        return res.status(200).json(tag);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getagById = getagById;
// export const updateQuestionTags = async(req:iTagExtended, res:Response) => {
//     try {
//         if(true){
//             const {tid,tname,qid} = req.body
//             await DbControllerHelpers.exec('updateQuestionTags', {tid,tname,qid})
//             return res.status(200).json({message:"tag updated successfully"})
//         }            
//         return res.status(404).json({message:"cannot update tag"})
//     } catch (error:any) {
//         return res.status(500).json({message:error.message})
//     }
// }
const deleteQuestionTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield dbhelper_1.DbControllerHelpers.exec('deleteQuestionTags', { qid: id });
        return res.status(200).json({ message: "question tags successfully deleted" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.deleteQuestionTags = deleteQuestionTags;
