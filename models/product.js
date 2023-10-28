import mongoose, { Schema } from 'mongoose'

const productSchema =  mongoose.Schema({
    name:{
        type:String
    },
    brand:{
        type:String
    },
    price:{
        type:Number
    },
    status:{
        type:String
    }
})

const Products = mongoose.model('products',productSchema)
export default Products