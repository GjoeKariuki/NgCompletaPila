import {Request,Response} from 'express'
import { iAnswer, iAnswerExtended } from "../interfaces";
import { v4 as uid } from 'uuid'
import { DbControllerHelpers } from '../dbhelper';
import { answerSchema } from '../helpers/validations';




// post answer
export const createAnswer = async(req:iAnswerExtended, res:Response) => {
    try {
        let aid = uid()
        const {qid,atitle,abody} = req.body
        const {error} = answerSchema.validate(req.body)
        if(error){
            return res.status(422).json(error.details[0].message)
        }
        await DbControllerHelpers.exec('postAnswer',{aid,qid,atitle,abody})
        return res.status(201).json({message:"answer successfully created"})
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}

// get answers
export const getallAnswers = async(req:Request,res:Response) => {
    try {
        let answers:iAnswer[] = (await DbControllerHelpers.exec('getAllAnswers')).recordset
        return res.status(200).json(answers)
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}

export const getAnswersbyId = async(req:iAnswerExtended,res:Response) => {
    try {
        const {id} = req.params
        let answer:iAnswer = (await DbControllerHelpers.exec('getAnswersbyId', {aid:id})).recordset[0]
        if(answer){
            return res.status(200).json(answer)
        }
        return res.status(404).json({message: "answer id is invalid"})
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}

export const getanswerByQid = async(req:iAnswerExtended,res:Response) => {
    try {
        const {id} = req.params
        let answer:iAnswer[] = (await DbControllerHelpers.exec('getAnswersbyQid', {qid:id})).recordset
        if(answer){
            return res.status(200).json(answer)
        }
        return res.status(404).json({message: "answer not found. the id is invalid"})
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}





// update answer
export const updateAnswer = async(req:iAnswerExtended,res:Response) => {
    try {
        const {id} = req.params
        let answer:iAnswer[] = (await DbControllerHelpers.exec('getAnswersbyId', {aid:id})).recordset
        if(!answer.length){
            return res.status(404).json({message: "answer does not exists. check id"})
        }
        const {atitle,abody} = req.body
        await DbControllerHelpers.exec('updateAnswer', {aid:id,atitle,abody})
        return res.status(200).json({message: "answer successfully updated "})
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}


