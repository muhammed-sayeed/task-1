import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'

import Uzer from '../../models/user.js'

export const register = async(req,res)=>{
    try {
        
        const errors = validationResult(req);
            if (!errors.isEmpty()) {
              console.log(errors);
            
               let message =
                errors.errors[0].path +
                " " +
                (errors.errors[0].msg == "Invalid value"
                  ? "is invalid, please check the value!"
                  : errors.errors[0].msg);
              return res.status(422).json({message});
            }

        const username = req.body.username
        const isUsername = await Uzer.findOne({username:username})
        if(isUsername){
            res.status(409).json({message:'username already exist'})
        }else{
            const email = req.body.email
            const isEmail = await Uzer.findOne({email:email})
            if(isEmail){
                res.status(409).json({message:'email already exist'})
            }else{
                const password = req.body.password
                const hassedPassword = await bcrypt.hash(password,10)
        
                const newUser = new Uzer({
                    username: username,
                    email: email,
                    password: hassedPassword,
                    role: req.body.role
                })
        
                await newUser.save()
                let data ={
                    username: username,
                    email: email,
                    role: req.body.role
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
                res.status(200).json({message:'successfully registered',tokens})
            }
           
        }
        
    } catch (error) {
        res.status(400).json({message:'somthing went wrong'})
    }
}