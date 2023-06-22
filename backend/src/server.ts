
import express, {json} from 'express'
import cors from 'cors'
import userOutes from './routes/useroutes'
import questionRoutes from './routes/questionroutes'
import answerRoutes from './routes/answeroutes'
import tagRoutes from './routes/tagroutes'
import questiontagRoutes from './routes/questiontagroutes'
import commentRoutes from './routes/commentsroutes'
import answervotesRoutes from './routes/answervotesroutes'


const app = express()

app.use(cors())
app.use(json())


app.use('/users', userOutes)
app.use('/questions', questionRoutes)
app.use('/answers', answerRoutes)
app.use('/tags', tagRoutes)
app.use('/questiontags', questiontagRoutes)
app.use('/comments', commentRoutes)
app.use('/answer-votes', answervotesRoutes)


app.listen(8080, ()=> {
    console.log("running part 2")    
})

export default app