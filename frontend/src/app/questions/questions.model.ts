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
    tname:string|string[]
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



export interface addUser {
    uname:string
    uemail:string
    upassword:string
    urole:string
    uprofPic:string
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
    email:string
}
export interface iAnswer {
    aid:string
    qid:string
    uid:string
    atitle:string
    abody:string
    aisDeleted:number
    adatecreated:string
    isPreffered:number
}

export interface addAnswer {
    qid: string
    atitle: string
    abody: string
}

export interface iTag {
    tid:string
    tname:string
    qid:string
}
export interface addTag {
    tname:string|string[]
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
    avid:string
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
