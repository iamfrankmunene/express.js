//import express from 'express'
//import cookieParser from 'cookie-parser'
//import session from 'express-session'
//import passport from 'passport'
import mongoose from 'mongoose'
//import MongoStore from 'connect-mongo'
import './strategies/localStrategy.mjs'
// import  { users }  from './utils/constants.mjs'
//import router from './routes/viewRoutes.mjs'
import { createApp } from './createApp.mjs'
import dotenv from 'dotenv'


dotenv.config()


//const app = express()

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected to DataBase."))
.catch((err) => console.log(`Error:${err}`) )

const app = createApp()




const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Running on port`)
})