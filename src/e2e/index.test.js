/* import request from 'supertest'
import express from 'express'

const app = express()

app.get('/hello', (req, res) => res.status(200).send({msg: "OK"}))

describe('hello endpoint', () => {
    it('should get /hello endpoint and expect status 200', async() => {
        const response = await request(app).get('/hello')
        //write an assertion on the response
        expect(response.statusCode).toBe(200)
        expect(response.body).toStrictEqual({msg: "OK"})
    })
    /* it('get /hello endpoint and expect status 200', () =>{
        request(app)
          .get('/hello')
          .expect(200) //expect() is from supertest
          .end((err, res) => {
            if (err) throw err;
        })
    }) 
}) */



import request from 'supertest'
import mongoose from 'mongoose'
import { createApp } from '../createApp.mjs'
import dotenv from 'dotenv'

dotenv.config()

 


describe('/api/auth', () => {

    let app
    beforeAll(() => {
        mongoose.connect(process.env.MONGO_URI_TEST)
        //.then(() => console.log("Connected to test DataBase."))
        .catch((err) => console.log(`Error:${err}`) )

        app = createApp()
    })

    it('should return status 401 when not logged in', async() => {
        const response = await request(app).get('/api/auth/status')
        expect(response.statusCode).toBe(401)
    })

    afterAll(async() => {
        await mongoose.connection.dropDatabase()
        await mongoose.connection.close()
    })
})
