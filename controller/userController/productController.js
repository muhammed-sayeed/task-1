import Products from "../../models/product.js";

export const fetchProducts = async(req,res)=>{
    try {
        const products = Products.find({})
        res.status(200).json({message:'products fetched successfully',products})
    } catch (error) {
        res.status(400).json({message:'something went wrong'})
    }
}