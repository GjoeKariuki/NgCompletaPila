import {Router} from 'express'
import { createTag, getagById,getallTags } from '../controllers/tagcontroller'

const tagRoutes = Router()


tagRoutes.post('', createTag)
tagRoutes.get('', getallTags)
tagRoutes.get('/:id', getagById)

export default tagRoutes