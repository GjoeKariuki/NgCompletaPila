import {Router} from 'express'
import {registerUser, getallUsers, getuserByemail, getuserByid, updateUser, signinUser, deleteUserecords} from '../controllers/usercontroller'
import {tokenize} from '../middlewares/tokenizing'


const userOutes = Router()


userOutes.post('/login',signinUser)
userOutes.post('', registerUser)
userOutes.get('', getallUsers)
userOutes.get('/id/:id', getuserByid)
userOutes.get('/barittos', getuserByemail)
userOutes.put('/:id', updateUser)
userOutes.delete('/:email', tokenize,deleteUserecords)



export default userOutes