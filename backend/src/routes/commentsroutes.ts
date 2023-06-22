import {Router} from 'express'
import { getCommentsById , createComments, getcommentsByAnswer, updateComment} from '../controllers/commentscontroller'

const commentRoutes = Router()


commentRoutes.post('', createComments)
commentRoutes.get('/aid/:id', getcommentsByAnswer)
commentRoutes.get('/cid/:id', getCommentsById )
commentRoutes.put('/:id', updateComment)

export default commentRoutes