import { Request, Response } from "express"
import { v4 as uid } from 'uuid'
import { DbControllerHelpers } from "../dbhelper"
import { iTag, iTagExtended } from "../interfaces"

// post tag

export  const createTag = async(req:iTagExtended,res:Response) => {
    try {
       
        const {tname} = req.body
        for (let tn of tname){
            let tid = uid()
            await DbControllerHelpers.exec('postTag', {tid,tn})
        }       
        return res.status(201).json({message:"tag successfully created"})
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}

// get tag
export const getallTags = async(req:Request, res:Response) => {
    try {
        let tags:iTag[] = (await DbControllerHelpers.exec('getallTags')).recordset
        return res.status(200).json(tags)
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}

export const getagById = async(req:iTagExtended,res:Response) => {
    try {
        const {id} = req.params
        let tag:iTag = (await DbControllerHelpers.exec('getTagbyid', {tid:id})).recordset[0]
        return res.status(200).json(tag)
    } catch (error:any) {
        
    }
}