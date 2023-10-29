import express from 'express'

import roleBasedAuthentication from '../middlewares/authenticate.js'

const adminRoute = express.Router()

import { addProduct } from '../controller/adminController/productController.js'

adminRoute.post('/addproduct',roleBasedAuthentication('admin'),addProduct)

export default adminRoute

