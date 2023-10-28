import express from 'express'

import roleBasedAuthentication from '../middlewares/authenticate.js'

const userRoute = express.Router()

userRoute.post('/register',register)
userRoute.post('/login',login)
userRoute.get('/products',roleBasedAuthentication('user'),fetchProducts)

export default userRoute

import {register} from '../controller/userController/registerController.js'
import { login } from '../controller/userController/loginController.js'
import { fetchProducts } from '../controller/userController/productController.js'