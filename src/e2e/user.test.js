import request from 'supertest'
import mongoose from 'mongoose'
import '../strategies/localStrategy.mjs'
import { createApp } from '../createApp.mjs'
import dotenv from 'dotenv'

dotenv.config()


describe('create user and login', () => {

    let app
    beforeAll(() => {
        mongoose.connect(process.env.MONGO_URI_TEST)
        //.then(() => console.log("Connected to test DataBase."))
        .catch((err) => console.log(`Error:${err}`) )

        app = createApp()
    })

    it('should create the user', async() => {
        const response = await request(app).post('/api/users')
        .send({
            name: "Rick",
            password: "Rick123",
            displayName: "RickTheFreak"
        })
        expect(response.statusCode).toBe(201)
    })

    it('should log the user in and visit /api/auth/status and return authenticated user', async() => {
        const response = await request(app).post('/api/auth')
        .send({
            name: "Rick",
            password: "Rick123"
        })
        .then((res) => {
            return request(app).get('/api/auth/status').set('Cookie', res.headers['set-cookie'])
        })
        expect(response.statusCode).toBe(200)
        expect(response.body.name).toBe("Rick")
        //expect(response.headers)
    })
    

    afterAll(async() => {
        await mongoose.connection.dropDatabase()
        await mongoose.connection.close()
    })
})