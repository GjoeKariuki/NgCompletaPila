import { Response } from "express";
import { iComments, iCommentsExtended } from "../interfaces";
import { v4 as uid } from 'uuid'
import { DbControllerHelpers } from "../dbhelper";


// post comments
export const createComments = async(req:iCommentsExtended, res:Response) => {
    try {
        let cid = uid()
        const {aid,cbody} = req.body
        await DbControllerHelpers.exec('postComment', {cid,aid,cbody})
        return res.status(201).json({message: "comment successfully created"})
    } catch (error:any) {
        return res.status(500).json({message:error.message})        
    }
}


// get comments
export const getcommentsByAnswer = async(req:iCommentsExtended, res:Response) => {
    try {
        const {id} = req.params
        let comment:iComments[] = (await DbControllerHelpers.exec('getCommentAnswers', {aid:id})).recordset
        if(!comment.length){
            return res.status(404).json({message: "answer id not valid"})
        }
        return res.status(200).json(comment)
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}

export const getCommentsById = async(req:iCommentsExtended, res:Response) => {
    try {
        const {id} = req.params
        let comment:iComments = (await DbControllerHelpers.exec('getCommentsById', {cid:id})).recordset[0]
        if(comment){
            return res.status(200).json(comment)
        }
        return res.status(404).json({message: "id is invalid"})
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}


//update
export const updateComment = async(req:iCommentsExtended,res:Response) => {
    try {
        const {id} = req.params
        let comment:iComments[] = (await DbControllerHelpers.exec('getCommentsById', {cid:id})).recordset
        if(!comment.length){
            return res.status(404).json({message: "comment not found by id"})
        }
        const {cbody} = req.body
        await DbControllerHelpers.exec('updateComment', {cid:id,cbody})
        return res.status(200).json({message:"comment successfully updated"})
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}