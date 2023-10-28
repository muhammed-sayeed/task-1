import mongoose from 'mongoose'

const userScheme = mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    role:{
        type:String
    }
})

const User = mongoose.model('User',userScheme)
export default User