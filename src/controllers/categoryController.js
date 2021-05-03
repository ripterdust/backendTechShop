import { db as firebase } from "../db";
import { Category } from "../models/Category";

// Initializations
const firestore = firebase.firestore();

export const getAllCategories = async (req, res) => {
    try{
        const categories = firestore.collection('categories')
        const query = await categories.get();
        if(query.empty){
            res
                .status(400)
                .send({
                    status: 'No categories found',
                 
                })
        } else{
            let data = [];
            query.forEach(doc => {
                let cat = new Category(
                    doc.id,
                    doc.data().category
                );
                data = [...data, cat];
            });
            
            res
                .status(200)
                .send({data});
        }
    }catch (err) {
        res
            .status(500)
            .send({
                err: err.message
            })
    }
}

export const addCategory = async (req, res) => {
    try{
        const data = req.body;
        await firestore.collection('categories').doc().set(data);
        res.send('Saved');
    } catch(err){
        res
            .status(500)
            .send({
                err: err.message
            })
    }
}

export const deleteCategory = async (req, res) => {

    try{
        res
            .status(200)
            .send(`Deleting ${req.params.id}`)
    } catch(err){
        res
            .status(500)
            .send({
                err: err.message
            })
    }

}

export const getCategory = (req, res) => {

    try{
        res
            .status(200)
            .send({
                status: 200,
                send: req.params.id
            })
    }catch (err) {
        res
            .status(500)
            .send({
                err: err.message
            })
    }
    
}