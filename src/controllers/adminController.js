import { db as firebase } from "../db";
import { Category } from "../models/Category";
import { Product } from "../models/Product";

const firestore = firebase.firestore();

export const mainPage = async (req, res) => {

    try{
        // Getting products
        const pRef = await firestore.collection('products');
        const pData = await pRef.orderBy('name').get();
        let dataProduct = [];

        if(pData.empty){
            console.log('está vacío')
        } else {
            pData.forEach( doc => {
                let product = new Product(
                    doc.id,
                    doc.data().name,
                    doc.data().category,
                    doc.data().price,
                    doc.data().quantity,
                );
                dataProduct = [...dataProduct, product];
            })
        }
        // Gettings categories

        const cRef = await firestore.collection('categories');
        const cData = await cRef.orderBy('category').get();
        let dataCategories = []

        if(cData.empty){
            console.log('No hay categoríes')
        } else{
            cData.forEach( doc => {
                let category = new Category(
                    doc.id,
                    doc.data().category
                );

                dataCategories = [...dataCategories, category]
            });
        }
        res
            .render('index',{
                categories: dataCategories,
                products: dataProduct

            })

    } catch(err){
        console.log(err.message)
        res.render('index', {data: {
            categories: 'bryan',
            Products: [{name: 'Bryan'}]
        }})
    }
 
}

// Categories

export const newCategory = async(req, res) => {
    res.render('categories/newCategory');
}

export const addCategory = async (req, res) => {
    try{
        const data = req.body;
        await firestore.collection('categories').doc().set(data);
    }catch(err){
        console.log(err.message);

    }
    res.redirect('/')
}

export const updateCategoryForm = async (req, res) => {
    try{
        const { id } = req.params;

        if(id){
            const data = await firestore.collection('categories').doc(id).get();
            
            if(data){

                const category = new Category(
                    data.id,
                    data.data().category
                )

                res.render('categories/updateCategory', {
                    data: category
                })
            }
        }
        
        
    }catch(err){
        console.log(err.message);
        res
            .status(500)
            .redirect('/');
    }
}

export const putCategory = async(req, res) => {
    const { id, category } = req.body;
    try{
        const data = await firestore.collection('categories').doc(id);
        await data.update({category: category});
        res.status(200)
    } catch(err) {
        console.log(err.message);
        res.status(500)
    }
    res.redirect('/')
}

export const deleteCategory = async (req, res) => {
    try{
        const { id } = req.params
        await firestore.collection('categories').doc(id).delete();
        res.redirect('/');
    }catch (err){
        console.log(err.message);
        res.redirect('/');
    }
    
}

// Products
export const newProduct = async (req, res) => {
    let data = [];
    try{
        const catRef = await firestore.collection('categories')
        const catData = await catRef.get();

        catData.forEach(doc => {
            data = [...data, {category: doc.data().category}]
        });
        console.log(data)
    }catch(err){
        console.log(err.message)
    }
    res.render('products/newProduct', {categories: data});
}

export const addProduct = async (req, res) => {
    
    try{
        const body = req.body;
        await firestore.collection('products').doc().set(body);
        res.redirect('/');
    }catch(err){
        console.log(err.message)
        res.redirect('/')
    }

}

export const updateProductForm = async (req, res) => {
    try{
        const { id } = req.params;

        if(id){
            const data = await firestore.collection('products').doc(id).get();
            
            if(data){
                const product = new Product(
                    data.id,
                    data.data().name,
                    data.data().category,
                    data.data().price,
                    data.data().quantity,
                    data.data().img,
                    data.data().description
                );
                res.render('products/updateProduct', {
                    data: product
                });
            }
        }
        
    }
    catch(err){
        console.log(err.message)
        res
            .status(500)
            .redirect('/');
    }
}

export const deleteProduct = async (req, res) => {
    try{
        const { id } = req.params
        await firestore.collection('products').doc(id).delete();
        res.redirect('/');
    }catch (err){
        console.log(err.message);
        res.redirect('/');
    }
    
}

export const putProduct = async (req, res) => {
    const {id, name, description, img, price, quantity} = req.body;

    try{
        const product = await firestore.collection('products').doc(id);
        const data = {
            name, 
            description,
            img,
            price,
            quantity
        }
        await product.update(data);

    }catch(err){
        console.log(err.message);
        res.status(500);
    }
    res.redirect('/');
}
