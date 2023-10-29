import Products from "../../models/product.js"

export const addProduct = async(req,res)=>{
   try {
    const productName = req.body.name
    const isAvailable = await Products.findOne({name:productName})
    if(isAvailable){
     res.status(409).json({message:'same product already avilable'})
    }else{
     const newProduct = new Products({
         name:req.body.name,
         brand:req.body.brand,
         price:req.body.price,
         status:req.body.status
     })
     await newProduct.save()
     res.status(200).json({message:'successfully added'})
    }
   } catch (error) {
    res.status(404).json({message:'Resources not found'})
   }
}