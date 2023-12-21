import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import db from './config/database.js'
import cookieParser from 'cookie-parser'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'
import RouuteAuth from './roters/RouteAuth.js'
// import ModelRole from './models/ModelKas.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()

try {
    await db.authenticate()
    console.log('database connect')
    // await ModelRole.sync()
} catch (error) {
    console.log(error)
    
}

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use('/public', express.static(path.join(__dirname, 'publicn')))

app.use('/auth', RouuteAuth)

app.listen(process.env.Port||5001, ()=> console.log("server running"))