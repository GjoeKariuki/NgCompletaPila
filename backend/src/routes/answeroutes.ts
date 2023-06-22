import {Router} from 'express'
import { createAnswer, getAnswersbyId, getallAnswers, getanswerByQid, updateAnswer } from '../controllers/answercontroller'

const answerRoutes = Router()


answerRoutes.post('', createAnswer)
answerRoutes.get('', getallAnswers)
answerRoutes.get('/qid/:id', getanswerByQid)
answerRoutes.get('/aid/:id', getAnswersbyId)
answerRoutes.put('/:id', updateAnswer)





export default answerRoutes