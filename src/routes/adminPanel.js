import { Router } from 'express';
import { addCategory, addProduct, deleteCategory, deleteProduct, mainPage, newCategory, newProduct, putCategory, putProduct, updateCategoryForm, updateProductForm } from '../controllers/adminController';


export const adminPanel = Router();

adminPanel
    .get('/', mainPage)
    .get('/add-category', newCategory)
    .get('/add-product', newProduct)
    .get('/delete-category/:id', deleteCategory)
    .get('/delete-product/:id', deleteProduct)
    .get('/edit-category/:id', updateCategoryForm)
    .get('/edit-product/:id', updateProductForm)
    .post('/addProduct', addProduct)
    .post('/addCategory', addCategory)
    .post('/update-category', putCategory)
    .post('/put-product', putProduct)
