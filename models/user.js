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

const Uzer = mongoose.model('Uzer',userScheme)
export default Uzer