import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import router from './routes/viewRoutes.mjs'


export function createApp() {

    const app = express()
    app.use(express.json())
    app.use(cookieParser('mySecret'))
    app.use(session({
    secret: 'mySignature',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60 * 60 * 1000 /* 1 hour */
    },
    store: MongoStore.create({
        client: mongoose.connection.getClient()
    })
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(router)


app.post('/api/auth', passport.authenticate('local'), (req, res) => {
    console.log(`response body,  ${res}`)
    res.send("OK")
}) 



app.get('/', (req, res) =>{
    res.cookie('hello', 'world', { maxAge: 30 * 1000 , signed: true })
    console.log(req.session)
    console.log(req.sessionID)
    req.session.visited = true

    res.status(201).send({msg: "Hello"})
})


/* app.post('/api/auth', (req, res) => {
    const { body: { name, password} } = req
    const findUser = users.find((user) => user.name === name)
    if (!findUser || findUser.password !== password) return res.status(401).send({msg: "Bad credentials!"})

    req.session.user = findUser
    return res.status(200).send(findUser)
}) */

/* app.get('/api/auth/status', (req, res) => {
    //By checking if req.session.user is defined
    return req.session.user ? res.status(200).send(req.session.user) 
    : res.status(401).send({msg: "Not Authenticated."})
}) */


app.get('/api/auth/status', (req, res) => {
    console.log("Inside /auth/status endpoint")
    console.log(req.user)
    console.log(`session, mongo-Client/// ${mongoose.connection.getClient()}`)
    return req.user ? res.send(req.user) : res.sendStatus(401)
})

app.post('/api/auth/logout',(req, res) => {
    if (!req.user) return res.sendStatus(401)

    req.logout((err) => {
        if(err) return res.sendStatus(400) 
        res.sendStatus(200)
    })    
    
})

app.post ('/api/cart', (req, res) => {
    if (!req.session.user) return res.sendStatus(401)
    const { body:item } = req

    const { cart } = req.session
    if (cart) {
        cart.push(item)
    } else {
        req.session.cart = [item]
    }
    return res.status(201).send(item)
})

app.get('/api/cart', (req, res) => {
    if (!req.session.user) return res.sendStatus(401)
    return res.send(req.session.cart ?? [])
})
return app
}