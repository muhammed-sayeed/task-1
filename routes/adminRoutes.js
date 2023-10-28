import express from 'express'

import roleBasedAuthentication from '../middlewares/authenticate.js'

const adminRoute = express.Router()

adminRoute.post('/addproduct',roleBasedAuthentication('admin'),addProduct)

export default adminRoute

import { addProduct } from '../controller/adminController/productController.js'