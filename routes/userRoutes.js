import express from 'express'
import { loginValidator } from '../middlewares/validator.js'

import roleBasedAuthentication from '../middlewares/authenticate.js'

const userRoute = express.Router()

import {register, login} from '../controller/userController/registerController.js'
import { fetchProducts } from '../controller/userController/productController.js'

userRoute.post('/register',loginValidator,register)
userRoute.post('/login',login)
userRoute.get('/products',roleBasedAuthentication('user'),fetchProducts)

export default userRoute

