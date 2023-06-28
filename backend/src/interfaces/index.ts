import {Request} from 'express'



export interface TokenRequest extends Request{
    info?:iDecodedData
}

export interface iDecodedData {
    uid:string
    uname:string
    uemail:string
    urole:string
}

export interface iUSER {
    uid:string
    uname:string
    uemail:string
    upassword:string
    urole:string
    uprofPic:string
    uemailSent:number
    uisDeleted:number
}

export interface iUserExtended extends Request {
    body: {
        uname:string
        uemail:string
        upassword:string
        urole:string
        uprofPic:string
    }
    info?: iDecodedData
    params: {
        id:string
        email:string
    }
}


export interface iQuestion {
    qid:string
    uid:string
    qtitle:string
    qbody:string
    qisDeleted:number
    qdatecreated:string
}

export interface iQuestionExtended extends Request {
    body: {
        uemail:string
        qtitle:string
        qbody:string
        tname:string[]
    }
    info?:iDecodedData
    params: {
        id:string
        email:string
    }
}


export interface iAnswer {
    aid:string
    qid:string
    atitle:string
    abody:string
    aisDeleted:number
    adatecreated:string
}


export interface iAnswerExtended extends Request {
    body: {
        aid:string
        qid:string
        atitle:string
        abody:string
    }
    info?:iDecodedData
    params: {id:string}
}


export interface iTag {
    tid:string
    tname:string
}

export interface iTagExtended extends Request {
    body: {tname:string[]}
    params: {id:string}
}

export interface iQuesTag {
    qid:string
    tid:string
}

export interface iQuesTagExtended extends Request {
    body: {
        qid:string
        tid:string
    }
    params: {id:string}
}

export interface iComments {
    cbody:string
    cisDeleted:string
    cid:string
    qid:string
    aid:string
    uid:string
}

export interface iCommentsExtended extends Request {
    body: {
        aid:string
        cbody:string
    }
    params: {
        id:string
    }
}


export interface iAnswerVotes {
    aid:string
    uid:string
    aupvotes:number
    adownvotes:number
    apreffered:number
}

export interface iAnswerVotesExtended extends Request {

    body: {
        aid:string
        aupvotes:number
        adownvotes:number
        apreffered: number
    }
    params: {id:string}
}