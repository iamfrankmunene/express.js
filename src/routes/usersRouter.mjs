import  { Router } from 'express'
import { validationResult, query, checkSchema, matchedData } from 'express-validator'
import { createUserValidationSchema } from '../utils/validationSchemas.mjs'
import { User} from '../mongoose/schemas/userSchema.mjs'
import { users } from '../utils/constants.mjs'
import { resolveIndexByUserId } from '../utils/middlewares.mjs'
import { createUserHandler, getUserByIdHandler } from '../handlers/usersHandler.mjs'

const router = Router()

router.get('/api/users',query('filter').isString().withMessage("Filter must be a string"), (req, res) => {
    console.log("user",req.session)
    console.log("userSession.id",req.session.id)
    req.sessionStore.get(req.session.id, (err, sessionData) => {
      if (err) {
         console.log("err...",err)
         throw err
      }
      console.log("sessionData...", sessionData)
    })
    const result = validationResult(req)
    //console.log("result", result)
    const { query : { filter, value},} = req
    
   /*  if (!filter && !value) return res.send(users) */
    if (filter && value) return res.send(users.filter((user) => {
       return user[filter].includes(value)
    }))
   return res.send(users)
})


router.get ('/api/users/:id',resolveIndexByUserId, getUserByIdHandler)
    /* (req,res) => {
   const { findUserIndex } = req */
   /* const parsedId = parseInt(req.params.id)
   if (isNaN(parsedId)) {
       return res.status(400).send({msg : "Invalid ID"})
   }

   const findUser = users.find((user) => user.id === parsedId) */
  /*  const findUser = users.find((user) => user.id === findUserIndex+1)
   if (!findUser) return res.sendStatus(404)
   return res.send(findUser)
}) */


router.post('/api/users', checkSchema(createUserValidationSchema),
   createUserHandler
    /*  //When Using validationSchemas
    checkSchema(createUserValidationSchema)
   
     [body('name')
     .notEmpty().withMessage("Enter a name")
     .isLength({ min:3, max:30 }).withMessage("Name must be between 3 to 30 characters")
     .isString().withMessage("Name must be a string"), 
     body('displayName').notEmpty().withMessage("Enter a display name")],  */

     
      
   /* //When Using validationSchemas
    const result = validationResult(req)
    console.log(result)

    if (!result.isEmpty()) return res.status(400).send({ errors: result.array()})

    // returns the data being validated 
    const data = matchedData(req)
    console.log(data)

    const newUser = {id: users[users.length-1]. id + 1, ...data}
    users.push(newUser)
    return res.status(201).send(newUser) */
)


/* router.put('/api/users/:id',resolveIndexByUserId, (req, res) => {
   const { body, findUserIndex} = req */
   /* const { body, params: { id } } = req

   const parseId = parseInt(id)
   if (isNaN(parseId)) return res.sendStatus(400)
   
   const findUserIndex = users.findIndex((user) => user.id === parseId)
   if (findUserIndex === -1) return res.status(404).send("user doesn't exist") */
   
   /* users[findUserIndex] = {id: users[findUserIndex].id, ...body}
   return res.sendStatus(204) 
   })*/



router.patch('/api/users/:id',resolveIndexByUserId, (req, res) => {
   const { body, findUserIndex } = req
  /*  const { body, params: { id } } = req

   const parseId = parseInt(id)
   if(isNaN(parseId)) return res.status(400).send("Invalid Id")

   const findUserIndex = users.findIndex((user) => user.id === parseId)
   if (findUserIndex === -1) return res.status(404).send("User does not exist") */

   users[findUserIndex] = { ...users[findUserIndex], ...body}
   return res.sendStatus(204)

})


router.delete('/api/users/:id',resolveIndexByUserId, (req, res) => {
   const { findUserIndex } = req

   /* const parseId = parseInt(id)
   if (isNaN(parseId)) return res.sendStatus(400)

   const findUserIndex = users.findIndex((user) => user.id ===parseId)
   if (findUserIndex === -1) return res.sendStatus(404) */   

   users.splice(findUserIndex, 1)
   return res.sendStatus(200)
})

export default router