import bcrypt from 'bcrypt'


const saltRounds = 10

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

export const comparePassword = async(plain, hashed) => {
    return await bcrypt.compare(plain, hashed)
}  