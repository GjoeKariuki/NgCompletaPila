import {Router} from 'express'
import { createQuestionTag, getQuestiontagsbyId, getallQuestionsTags } from '../controllers/questagcontroller'

const questiontagRoutes = Router()


questiontagRoutes.post('', createQuestionTag)
questiontagRoutes.get('', getallQuestionsTags)
questiontagRoutes.get('/:id', getQuestiontagsbyId)






export default questiontagRoutes