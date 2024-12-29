import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    displayName: {
        type: mongoose.Schema.Types.String,
        unique: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true
    }

})

export const User = mongoose.model('User',userSchema)