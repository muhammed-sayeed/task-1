import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"
import { validationResult } from "express-validator"

import User from "../../models/user.js"

export const login = async(req,res)=>{
    try {
        // const errors = validationResult(req);
        //     if (!errors.isEmpty()) {
        //       console.log(errors);
        //       response.message =
        //         errors.errors[0].path +
        //         " " +
        //         (errors.errors[0].msg == "Invalid value"
        //           ? "is invalid, please check the value!"
        //           : errors.errors[0].msg);
        //       return res.status(200).json(response);
        //     }
        
            
        const email = req.body.email
        const password = req.body.password

        const isUser = await User.findOne({email:email})
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
                res.status(200).json({message:'successfully logined',tokens})
            }else{
                res.status(409).json({message:'incorrect password'})
            }
            
        }else{
            res.status(409).json({message:'Invalid email'})
        }
    } catch (error) {
        res.status(400).json({message:'somthing went wrong'})
    }
}