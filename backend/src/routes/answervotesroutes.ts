import {Router} from 'express'
import { postAnswervotes, getAnswerVotes, getAnswerVotesbyAid, getAnswerVotesbyid, updateAnswerVotes } from '../controllers/answervotecontroller'

const answervotesRoutes = Router()


answervotesRoutes.post('',postAnswervotes)
answervotesRoutes.get('', getAnswerVotes)
answervotesRoutes.get('/aid/:id', getAnswerVotesbyAid )
answervotesRoutes.get('/avid/:id', getAnswerVotesbyid)
answervotesRoutes.put('/:id', updateAnswerVotes)
// answervotesRoutes.get('', )






export default answervotesRoutes