import {Router} from 'express'
import { getCommentsById , createComments, getcommentsByAnswer, updateComment} from '../controllers/commentscontroller'
import {tokenize} from '../middlewares/tokenizing'



const commentRoutes = Router()


commentRoutes.post('', tokenize, createComments)
commentRoutes.get('/aid/:id', tokenize, getcommentsByAnswer)
commentRoutes.get('/cid/:id', tokenize, getCommentsById )
commentRoutes.put('/:id', tokenize, updateComment)

export default commentRoutes