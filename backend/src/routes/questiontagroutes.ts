import {Router} from 'express'
import { createQuestionTag, getQuestiontagsbyId, getallQuestionsTags } from '../controllers/questagcontroller'
import {tokenize} from '../middlewares/tokenizing'



const questiontagRoutes = Router()


questiontagRoutes.post('', tokenize, createQuestionTag)
questiontagRoutes.get('', tokenize, getallQuestionsTags)
questiontagRoutes.get('/:id', tokenize, getQuestiontagsbyId)






export default questiontagRoutes