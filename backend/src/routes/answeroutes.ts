import {Router} from 'express'
import { createAnswer, getAnswersbyId, getallAnswers, getanswerByQid, updateAnswer } from '../controllers/answercontroller'
import {tokenize} from '../middlewares/tokenizing'



const answerRoutes = Router()


answerRoutes.post('', tokenize, createAnswer)
answerRoutes.get('', tokenize, getallAnswers)
answerRoutes.get('/qid/:id', tokenize, getanswerByQid)
answerRoutes.get('/aid/:id', tokenize, getAnswersbyId)
answerRoutes.put('/:id', tokenize, updateAnswer)





export default answerRoutes