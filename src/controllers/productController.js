import { db as firebase } from '../db';
import { Product } from "../models/Product";
// Initializations

const firestore = firebase.firestore();

export const addProduct = async (req, res) => {

    if(req.body != {}){    
        try{ 
            const data = req.body;
            await firestore.collection('products').doc().set(data);
            res.send('saved');
        } catch(err){
            res
                .status(400)
                .send('No record found')
        }
    }

    if(req.body == {}) res.status(500).send('Ha ocurrido un error.')

}

export const getAllProducts = async (req, res) => {

    try{
        const products = await firestore.collection('products');
        const query = await products.get();
        let data = [];

        if(query.empty){ 
            res.status(400).send({ status: 'No records Found' });
        } else{
            query.forEach ( doc => {
                const product = new Product(
                    doc.id,
                    doc.data().name,
                    doc.data().category,
                    doc.data().price,
                    doc.data().quantity,
                );
                console.log(product.id)
                data = [ ...data, product]
                
            });

            res.send({
                data,
               status: 200
                
            });
            
        }

    } catch(err) {
        res
            .status(500)
            .send({
                status: 500,
                err: err.message
            });
    }

}

export const getProduct = async (req, res) => {
    try{
        let id = req.params.id;
        if(id){
            const data = await firestore.collection('products').doc(id).get();
            
            console.log(`Data: ${data}`)

            if(!data){
                res
                    .status(404)
                    .send({
                        status: 404,
                        id: req.params.id
                    })
            } else{
                
                res
                    .status(200)
                    .send({
                        status: 200,
                        data: data.data()
                    })
            }
        }
    }catch (err) {
        res
            .status(500)
            .send({
                status: 500,
                err: err.message
            })
    }
}

export const updateProduct = (req, res) => {
    try{
        res.send(`Actualizar el producto: ${req.params.id}`);
    } catch(err){
        res
        .status(500)
        .send({
            status: 500,
            err: err.message
        });
    }
}

export const deleteProduct = (req, res) => {
    try{
       res
       .status(200)
       .send(`Eliminando el producto: ${req.params.id}`) 
    } catch(err){
        res
        .status(500)
        .send({ 
            status: 500,
            err: err.message
        })
    }
}
