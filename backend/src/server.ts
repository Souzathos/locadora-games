import express from 'express'
import * as dotenv from 'dotenv'
import { AppDataSource } from './config/dataSource'
import routes from './routes'
import { errorHandler } from './middlewares/errorHandler'

const app = express()
app.use(express.json())
app.use(routes)
app.use(errorHandler)
dotenv.config()

const port = Number(process.env.PORT)

AppDataSource.initialize().then(() => {
    console.log('Database connected')

    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
})