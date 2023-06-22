import { Response } from "express";
import { iQuesTag, iQuesTagExtended } from "../interfaces";
import { DbControllerHelpers } from "../dbhelper";




// post tag
export const createQuestionTag = async(req:iQuesTagExtended, res:Response) => {
    try {
        const {qid,tid} = req.body
        await DbControllerHelpers.exec('postQuestionTags', {qid,tid})
        return res.status(201).json({message: "question tag successfully created"})
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}


// get all records
export const getallQuestionsTags = async(req:iQuesTagExtended,res:Response) => {
    try {
        let questags:iQuesTag[] = (await DbControllerHelpers.exec('getQuestionTag')).recordset
        return res.status(200).json(questags)
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}




export const getQuestiontagsbyId = async(req:iQuesTagExtended, res:Response) => {
    try {
        const {id} = req.params
        let qt:iQuesTag = (await DbControllerHelpers.exec('getQuestionTagbyQid', {qid:id})).recordset[0]
        if(!qt){
            return res.status(404).json({message: 'does not exist'})
        }
        return res.status(200).json(qt)
    } catch (error:any) {
        return res.status(500).json({message: error.message})
    }
}