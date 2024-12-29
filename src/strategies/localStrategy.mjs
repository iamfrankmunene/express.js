import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { User } from '../mongoose/schemas/userSchema.mjs'
import { comparePassword } from '../utils/helpers.mjs'
/* import { users } from '../utils/constants.mjs' */

passport.serializeUser((user, done) => {
    console.log("Inside Serialize User")
    console.log(user)
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    console.log("Inside Deserialize User")
    console.log(`Deserialize user ID : ${id}`)
    try {
       /*  const findUser = users.find((user) => user.id === id)
        if (!findUser) throw new Error("User Not Found.")
            done(null, findUser) */

        const findUser = await User.findById(id)
        if(!findUser) throw new Error("User Not Found")
        done(null, findUser)
    } catch (err) {
        done(err, null)
    }
})

export default passport.use(
    new LocalStrategy( {usernameField: 'name'}, async (username, password, done) => {
        console.log(`username:, ${username}`)
        console.log(`password:, ${password}`)
        try {
            /* const findUser = users.find((user)=> user.name === username)
            if(!findUser) throw new Error("User Not Found.")
            if(findUser.password !== password) throw new Error("Invalid Credentials")
            done (null, findUser)  */

            const findUser = await User.findOne({ name: username })
            console.log(`FindUser: ${findUser}`)
            if(!findUser) throw new Error("User Not Found")

            /* if (findUser.password !== passwordHashed) throw new Error ("Bad Credentials")  */
            const passwordAlreadyCompared = await comparePassword(password, findUser.password)
            if (!passwordAlreadyCompared) throw new Error ("Bad Credentials")
            
            done(null, findUser)
        } catch (err) {
    done(err, null)}
        
    })
)