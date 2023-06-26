import {Router} from 'express'
import { createTag, getagById,getallTags } from '../controllers/tagcontroller'
import {tokenize} from '../middlewares/tokenizing'



const tagRoutes = Router()


tagRoutes.post('', tokenize,createTag)
tagRoutes.get('', tokenize, getallTags)
tagRoutes.get('/:id', tokenize,getagById)

export default tagRoutes