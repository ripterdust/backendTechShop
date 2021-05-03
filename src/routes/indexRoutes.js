import { Router } from 'express';
import {
    addProduct, 
    deleteProduct, 
    getAllProducts, 
    updateProduct,
    getProduct
} from '../controllers/productController';
// Initialization
export const router = Router();

router
// Routes get
    
    .get('/', getAllProducts)
    .get('/product/:id', getProduct)

    

// Routes Post
    .post('/', addProduct)

// Routes deletes
    .delete('/:id', deleteProduct)

// Routes PUT
    .put('/:id', updateProduct)
