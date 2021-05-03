import { Router } from 'express';
import { addCategory, deleteCategory, getAllCategories, getCategory } from './../controllers/categoryController';

export const router = Router();

router
    .get('/', getAllCategories)
    .post('/', addCategory)
    .delete('/', deleteCategory)
    .get('/:id', getCategory)