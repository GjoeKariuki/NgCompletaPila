
import { Request, Response } from "express";
import { iQuestion, iQuestionExtended } from "../interfaces";
import { v4 as uid } from 'uuid'
import { DbControllerHelpers } from "../dbhelper";
import { questionSchema } from "../helpers/validations";








// post question
export const createQuestion = async(req:iQuestionExtended, res:Response) => {
    try {
        if(true){
            let qid = uid()
            const {uemail} = req.info as {uemail:string}
            const {qtitle,qbody} = req.body
            const {error} = questionSchema.validate(req.body)
            if(error){
                return res.status(422).json(error.details[0].message)
            }
            await DbControllerHelpers.exec('postQuestion', {qid, uemail, qtitle, qbody})
            return res.status(201).json({message: "question successfully created"})
        }
        
            //return res.status(404).json({message: "cannot create question"})
        
        
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}


// get questions 
export const getallQuestions = async(req:Request,res:Response) => {
    try {
        let questions:iQuestion[] = (await DbControllerHelpers.exec('getAllQuestions')).recordset
        return res.status(200).json(questions)
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}

export const getquestionByQid = async(req:iQuestionExtended,res:Response) => {
    try {
        const {id} = req.params
        let question:iQuestion = (await DbControllerHelpers.exec('getQuestionbyQid', {qid:id})).recordset[0]
        if(question){
            return res.status(200).json(question)
        }
        return res.status(404).json({message: "question not found. the id is invalid"})
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}


export const getquestionByEmail = async(req:iQuestionExtended,res:Response) => {
    try {
        const {email} = req.params
        let question:iQuestion[] = (await DbControllerHelpers.exec('getQuestionbyEmail', {uemail:email})).recordset
        if(question){
            return res.status(200).json(question)
        }
        return res.status(404).json({message: "question not found. the user email is invalid"})
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}


// update question
export const updateQuestion = async(req:iQuestionExtended, res:Response) => {
    try {
        const {id} = req.params
        let question:iQuestion[] = (await DbControllerHelpers.exec('getQuestionbyQid', {qid:id})).recordset
        if(!question.length){
            return res.status(404).json({message: "question not found. the id is invalid"})
        }
        const {qtitle, qbody} = req.body
        await DbControllerHelpers.exec('updateQuestion', {qid:id, qtitle, qbody})
        return res.status(200).json({message:"question successfully updated"})

    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}



// delete question
export const deleteQuestion = async(req:iQuestionExtended, res:Response) => {
    try {
        if(req.info && req.info.urole === 'admin') {
            const {id} = req.params
            let question:iQuestion[] = (await DbControllerHelpers.exec('getQuestionbyQid', {qid:id})).recordset
            if(!question.length){
                return res.status(404).json({message: "question not found. qid is invalid"})
            }
            await DbControllerHelpers.exec('deleteQuestion', {qid:id})
            return res.status(200).json({message: "question successfully deleted"})
        }
        else {
            return res.status(403).json({message: "access is denied"})
        }
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}