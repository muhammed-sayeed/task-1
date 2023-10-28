import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import User from '../../models/user.js'

export const register = async(req,res)=>{
    try {
        const username = req.body.username
        const isUsername = await User.findOne({username:username})
        if(isUsername){
            res.status(409).json({message:'username already exist'})
        }
        const email = req.body.email
        const isEmail = await User.findOne({email:email})
        if(isEmail){
            res.status(409).json({message:'email already exist'})
        }
        const password = req.body.password
        const hassedPassword = await bcrypt.hash(password,10)

        const newUser = new User({
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
    } catch (error) {
        res.status(400).json({message:'somthing went wrong'})
    }
}