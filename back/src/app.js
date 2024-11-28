import "./config.js"
import express from 'express'
import cors from "cors";
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import { basicAuth } from './utils/basicAuth.js'

const port = 3001
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use(authRoutes)
app.use('/users', basicAuth, userRoutes)

app.get((req, res) => {
    res.status(404).send('Page not found')
})

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        status: error.statusCode,
        message: error.message,
        errors: error.errors
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})