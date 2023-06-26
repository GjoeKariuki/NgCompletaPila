import {Router} from 'express'
import { postAnswervotes, getAnswerVotes, getAnswerVotesbyAid, getAnswerVotesbyid, updateAnswerVotes } from '../controllers/answervotecontroller'
import { tokenize } from '../middlewares/tokenizing'


const answervotesRoutes = Router()


answervotesRoutes.post('', tokenize, postAnswervotes)
answervotesRoutes.get('',  tokenize, getAnswerVotes)
answervotesRoutes.get('/aid/:id',  tokenize, getAnswerVotesbyAid )
answervotesRoutes.get('/avid/:id',  tokenize, getAnswerVotesbyid)
answervotesRoutes.put('/:id',  tokenize, updateAnswerVotes)
// answervotesRoutes.get('', )






export default answervotesRoutes