import express from 'express'
import { loginValidator } from '../middlewares/validator.js'

import roleBasedAuthentication from '../middlewares/authenticate.js'

const userRoute = express.Router()

userRoute.post('/register',loginValidator,register)
userRoute.post('/login',login)
userRoute.get('/products',roleBasedAuthentication('user'),fetchProducts)

export default userRoute

import {register} from '../controller/userController/registerController.js'
import { login } from '../controller/userController/loginController.js'
import { fetchProducts } from '../controller/userController/productController.js'