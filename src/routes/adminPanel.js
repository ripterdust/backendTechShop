import { Router } from 'express';
import { addCategory, addProduct, deleteCategory, deleteProduct, mainPage, newCategory, newProduct } from '../controllers/adminController';


export const adminPanel = Router();

adminPanel
    .get('/', mainPage)
    .get('/add-category', newCategory)
    .get('/add-product', newProduct)
    .get('/delete-category/:id', deleteCategory)
    .get('/delete-product/:id', deleteProduct)
    .post('/addProduct', addProduct)
    .post('/addCategory', addCategory)
