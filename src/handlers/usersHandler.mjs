import { users } from '../utils/constants.mjs'
import { hashPassword } from '../utils/helpers.mjs'
import { User } from '../mongoose/schemas/userSchema.mjs'
import { validationResult, matchedData } from 'express-validator'

export const getUserByIdHandler = (req,res) => {
    const { findUserIndex } = req
    const findUser = users.find((user) => user.id === findUserIndex+1)
    if (!findUser) return res.sendStatus(404)
    return res.send(findUser)
 }
export const createUserHandler = 
     async (req, res) => {
      const result = validationResult(req)
      if(!result.isEmpty()) return res.status(400).send(result.array())

       //When using userSchema

      const data = matchedData(req)
      data.password = await hashPassword(data.password)
      /* console.log(data) */
      const newUser = new User(data)
      try{
         const savedUser = await newUser.save()
         /* console.log(savedUser) */
         return res.status(201).send(savedUser)
      } catch(err) {
         /* console.log(err) */
         return res.sendStatus(400)
      }
}