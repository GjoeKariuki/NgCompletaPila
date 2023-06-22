import {Router} from 'express'
import { createQuestion, deleteQuestion, getallQuestions,getquestionByEmail,getquestionByQid, updateQuestion } from '../controllers/questioncontrollers'
import {tokenize} from '../middlewares/tokenizing'


const questionRoutes = Router()


questionRoutes.post('', createQuestion)
questionRoutes.get('', getallQuestions )
questionRoutes.get('/:id', getquestionByQid)
questionRoutes.get('/email/:email', getquestionByEmail)
questionRoutes.put('/:id', updateQuestion)
questionRoutes.delete('/:id', tokenize, deleteQuestion)



export default questionRoutes