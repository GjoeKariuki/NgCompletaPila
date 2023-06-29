import {Router} from 'express'
import {  createTag, deleteQuestionTags, getTagsbyQid, getagById,getallTags} from '../controllers/tagcontroller'
import {tokenize} from '../middlewares/tokenizing'



const tagRoutes = Router()


tagRoutes.get('', tokenize, getallTags)
tagRoutes.get('/:id', tokenize,getagById)
tagRoutes.get('/qid/:id', tokenize, getTagsbyQid)
tagRoutes.post('', tokenize, createTag)
tagRoutes.delete('/:id', tokenize, deleteQuestionTags)

export default tagRoutes