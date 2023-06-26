import { Request, RequestHandler, Response } from "express"
import { v4 as uid } from 'uuid'
import { loginSchema, signupSchema } from "../helpers/validations"
import bcrypt from 'bcrypt'
import { DbControllerHelpers } from "../dbhelper"
import { iUSER, iUserExtended } from "../interfaces"
import jwt from "jsonwebtoken"
import { valid } from "joi"


export const signinUser = async(req:iUserExtended, res:Response) => {
    try {
        const {uemail,upassword} = req.body
        const {error} = loginSchema.validate(req.body)
        if(error) {
            return res.status(422).json(error.details[0].message)
        }
        let user:iUSER[] = await (await DbControllerHelpers.exec('getUserbyEmail', {uemail})).recordset
        if(!user[0]){
            return res.status(404).json({message: "user email not found"})
        }

        const validpwd = await bcrypt.compare(upassword, user[0].upassword)
        //console.log(validpwd);
        if(!validpwd){
            return res.status(404).json({message: "passwords do not match"})
        }

        const payload = user.map(usr => {
            const {upassword,uisDeleted,uemailSent,uprofPic, ...rest} = usr
            return rest
        })  
        
        const token = jwt.sign(payload[0], <string>process.env.SECRET_KEY, {expiresIn:'28800s'})
        return res.status(200).json({message:"login successful!!", token, role:user[0].urole, name:user[0].uname, email:user[0].uemail})

    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}


export const registerUser = async(req:iUserExtended, res:Response) => {
    try {
        let userid = uid()
        const { uname, uemail, upassword } = req.body
        const {error} = signupSchema.validate(req.body)
        if(error) {
            return res.status(422).json(error.details[0].message)
        }
        let hashpwd = await bcrypt.hash(upassword, 10)
        await DbControllerHelpers.exec('registerUser', {uid:userid, uname,uemail,upassword:hashpwd})
        return res.status(201).json({message:"user successfully registered"})

    } 
    catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}


export const getallUsers = async(req:iUserExtended, res:Response) => {
    try {
        let users:iUSER[] = await (await DbControllerHelpers.exec('getUserecords')).recordset
        return res.status(200).json(users)
    } 
    catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}


export const getuserByid:RequestHandler<{id:string}> = async(req,res) => {
    try {
        const {id} = req.params
        let user:iUSER = await (await DbControllerHelpers.exec('getUserbyId', {uid:id})).recordset[0]
        if(user){
             return res.status(200).json(user)
        }
        //console.log(user);
        
        return res.status(404).json({message: "user not found. "})
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}


export const getuserByemail:RequestHandler = async(req,res) => {
    try {
        const {uzeremail} = req.query as {uzeremail:string}
        // console.log(uzeremail)
        let user:iUSER = await (await DbControllerHelpers.query(`SELECT * FROM USERS WHERE uemail=${uzeremail}`)).recordset[0]
    
        // let user:iUSER = (await DbControllerHelpers.exec('getUserbyEmail', {uemail:email})).recordset[0]
        if(user){
            return res.status(200).json(user)
        }
        return res.status(404).json({message: "user not found. email is invalid"})
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}

export const updateUser = async(req:iUserExtended,res:Response) => {
    try {
        const {id} = req.params
        let user:iUSER[] = await (await DbControllerHelpers.exec('getUserbyId', {uid:id})).recordset
        if(!user.length){
            return res.status(404).json({message: "user not found. the user id is invalid"})
        }
        const {uname,uemail,upassword,urole,uprofPic} = req.body
        let hashpwd = await bcrypt.hash(upassword,10)
        await DbControllerHelpers.exec('updateUserecords', {uid:id,uname,uemail,upassword:hashpwd,urole,uprofPic})
        return res.status(200).json({message:"user records successfully updated"})

    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}

//  only admin can delete
export const deleteUserecords = async(req:iUserExtended, res:Response) => {
    try {
        if(req.info && req.info.urole === 'admin') {
            const {email} = req.params
            let user:iUSER[] = await (await DbControllerHelpers.exec('getUserbyEmail', {uemail:email})).recordset
            if(!user.length){
                return res.status(404).json({message: "user not found. email is invalid"})
            }
            await DbControllerHelpers.exec('deleteUserecords', {uemail:email})
            return res.status(200).json({message: "user successfully deleted"})
        }
        else {
            return res.status(403).json({message: "access is denied"})
        }
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}