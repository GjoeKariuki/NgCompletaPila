import { Request, Response } from "express";
import { iAnswerVotes, iAnswerVotesExtended } from "../interfaces";
import { DbControllerHelpers } from "../dbhelper";
import { v4 as uid } from 'uuid'



// post votes
export const postAnswervotes = async(req:iAnswerVotesExtended, res:Response) => {
    try {
        let avid = uid()
        // const {id} = req.params
        const {aid,aupvotes, adownvotes,apreffered} = req.body
        // console.log(req.body);
        
        await DbControllerHelpers.exec('postAnswervotes', {aid, aupvotes, adownvotes,apreffered, avid})
        return res.status(201).json({message: "answer votes successfully created"})
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}


// get votes
export const getAnswerVotes = async(req:Request,res:Response) => {
    try {
        let answervotes:iAnswerVotes[] =  (await DbControllerHelpers.exec('getAnswerVotes')).recordset
        if(answervotes){
            return res.status(200).json(answervotes)
        }
        return res.status(404).json({message:"no records found"})
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}

export const getAnswerVotesbyAid = async(req:iAnswerVotesExtended,res:Response) => {
    try {
        const {id} = req.params
        let answervote:iAnswerVotes[] = (await DbControllerHelpers.exec('getAnswerVotesbyAid', {aid:id})).recordset
        if(answervote){
            return res.status(200).json(answervote)
        }
        return res.status(404).json({message: "answer id is invalid"})
    } 
    catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}

export const getAnswerVotesbyid = async(req:iAnswerVotesExtended,res:Response) => {
    try {
        const {id} = req.params
        let answervote:iAnswerVotes = (await DbControllerHelpers.exec('getAnswerVotesbyid', {avid:id})).recordset[0]
        if(answervote){
            return res.status(200).json(answervote)
        }
        return res.status(404).json({message: "answer vote id is invalid"})
    } 
    catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}

// update votes
export const updateAnswerVotes = async(req:iAnswerVotesExtended,res:Response) => {
    try {
        const {id} = req.params
        let answervote:iAnswerVotes = (await DbControllerHelpers.exec('getAnswerVotesbyid', {avid:id})).recordset[0]
        if(!answervote) {
            return res.status(404).json({message:"answer vote not found.check its id"})
        }
        const {aid,aupvotes,adownvotes,apreffered} = req.body
        await DbControllerHelpers.exec('updateAnswerVotes', {avid:id, aid, aupvotes,adownvotes,apreffered})
        return res.status(200).json({message: "answer vote successfully updated"})
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}