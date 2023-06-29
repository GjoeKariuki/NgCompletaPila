import { Request, Response } from "express"
import { v4 as uid } from 'uuid'
import { DbControllerHelpers } from "../dbhelper"
import { iTag, iTagExtended } from "../interfaces"
import { tagSchema } from "../helpers/validations"
import { log } from "console"

// post tag

export  const createTag = async(req:iTagExtended,res:Response) => {
    try {
       
        const {tname,qid} = req.body
        //const {error} = tagSchema.validate(req.body)
        // if(error){
        //     return res.status(422).json(error.details[0].message)
        // }
        console.log(req.body);
        
        if(typeof(tname) == 'object'){
            for (let tn of tname){
                let tid = uid()
                await DbControllerHelpers.exec('postTag', {tid,tn,qid})
            }
        }
        else if(typeof(tname) == 'string'){
            let tid = uid()
            let tn = tname
            await DbControllerHelpers.exec('postTag', {tid,tn,qid})
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

export const getTagsbyQid = async(req:iTagExtended, res:Response) => {
    try {
        const {id} = req.params
        let tags:iTag[] = (await DbControllerHelpers.exec('gettagByQid', {qid:id})).recordset
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
        return res.status(500).json({message:error.message})
    }
}


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

export const deleteQuestionTags = async(req:iTagExtended, res:Response) => {
    try {
        const {id} = req.params
        await DbControllerHelpers.exec('deleteQuestionTags', {qid:id})
        return res.status(200).json({message:"question tags successfully deleted"})
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}