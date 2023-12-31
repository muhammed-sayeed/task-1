import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"

import Uzer from "../../models/user.js" 

export const login = async(req,res)=>{
    try {
            
        const email = req.body.email
        const password = req.body.password

        const isUser = await Uzer.findOne({email:email})
        if(isUser){

            const passCheck = await bcrypt.compare(password,isUser.password)
            if(passCheck){
                const data ={
                    username:isUser.username,
                    email: email,
                    role: isUser.role
                   }
                   const accessToken = jsonwebtoken.sign(data,process.env.access_secret,{
                       expiresIn: process.env.access_life
                   })
                   const refreshToken = jsonwebtoken.sign(data,process.env.refresh_secret,{
                       expiresIn:process.env.refresh_life
                   })
                   const tokens ={
                       access:accessToken,
                       refresh:refreshToken
                   }
                res.status(200).json({message:'successfully loged-in',tokens})
            }else{
                res.status(401).json({message:'incorrect password'})
            }
            
        }else{
            res.status(401).json({message:'Invalid email'})
        }
    } catch (error) {
        res.status(404).json({message:'Resources not found'})
    }
}