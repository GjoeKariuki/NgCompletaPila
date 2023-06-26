import {Router} from 'express'
import {registerUser, getallUsers, getuserByemail, getuserByid, updateUser, signinUser, deleteUserecords} from '../controllers/usercontroller'
import {tokenize} from '../middlewares/tokenizing'


const userOutes = Router()


userOutes.post('/login',signinUser)
userOutes.post('', registerUser)
userOutes.get('', tokenize, getallUsers)
userOutes.get('/id/:id', tokenize,getuserByid)
userOutes.get('/barittos', tokenize,getuserByemail)
userOutes.put('/:id', tokenize,updateUser)
userOutes.delete('/:email', tokenize,deleteUserecords)



export default userOutes