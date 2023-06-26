import dotenv from 'dotenv'
import path from 'path'
import { TokenRequest } from '../interfaces'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { iDecodedData } from '../interfaces'




dotenv.config({path:path.resolve(__dirname, '../../.env')})


export const tokenize = (req:TokenRequest, res:Response, next:NextFunction) => {
    const token = <string>req.headers['token']
    try {
        if(!token){
            return res.status(401).json({message:'unauthorized'})
        }
        const dedatoken = jwt.verify(token, <string>process.env.SECRET_KEY) as iDecodedData
        req.info = dedatoken
    } 
    catch (error:any) {
        return res.status(403).json({message:error.message})
    }
    next()
}