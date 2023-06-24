export interface iQuestion {
    qid:string
    uid:string
    qtitle:string
    qbody:string
    qisDeleted:number
    qdatecreated:string
}

export interface addQuestion {
    qtitle:string
    qbody:string
}

export interface iUser {
    uid:string
    uname:string
    uemail:string
    upassword:string
    urole:string
    uprofPic:string
    uemailSent:number
    uisDeleted:number
}

export interface iMessage {
    message:string
}

export interface iLoginUser {
    uemail:string
    upassword:string
}

export interface iLoginSuccess {
    message:string
    token:string
    role:string
    name:string
}
export interface iAnswer {
    aid:string
    qid:string
    atitle:string
    abody:string
    aisDeleted:number
    adatecreated:string
}

export interface addAnswer {
    qid: string
    atitle: string
    abody: string
}

export interface iTag {
    tid:string
    tname:string
}
export interface addTag {
    tname:string
}

export interface iQuesTag {
    qid:string
    tid:string
}

export interface addQuesTag {
    qid:string
    tid:string
}

export interface iComments {
    cbody:string
    cisDeleted:string
    cid:string
    qid:string
    aid:string
    uid:string
}

export interface addComments {
    aid: string
    cbody: string
}

export interface iAnswerVotes {
    aid:string
    uid:string
    aupvotes:number
    adownvotes:number
    apreffered:number
}

export interface addAnswerVotes {
    aid: string
    aupvotes: number
    adownvotes: number
    apreffered: number
}
