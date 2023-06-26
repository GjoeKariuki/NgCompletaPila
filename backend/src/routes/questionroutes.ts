import {Router} from 'express'
import { createQuestion, deleteQuestion, getallQuestions,getquestionByEmail,getquestionByQid, updateQuestion } from '../controllers/questioncontrollers'
import {tokenize} from '../middlewares/tokenizing'


const questionRoutes = Router()


questionRoutes.post('', tokenize, createQuestion)
questionRoutes.get('', tokenize, getallQuestions )
questionRoutes.get('/:id', tokenize, getquestionByQid)
questionRoutes.get('/email/:email', tokenize, getquestionByEmail)
questionRoutes.put('/:id', tokenize, updateQuestion)
questionRoutes.delete('/:id', tokenize, deleteQuestion)



export default questionRoutes