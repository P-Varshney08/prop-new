const express =  require('express');
const Joi = require('joi');
const Product = require('../models/Product');
const router = express.Router();
const {validateProduct} =  require('../middleware');

// displaying all the products
router.get('/blogs' , async(req,res)=>{
    try{
        let products = await Product.find({});
        res.render('products/index' , {products});
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
})

router.get('/blogs/working.ejs', (req, res)=>{
    res.render('products/working')
})

// adding a fomr for  anew product
router.get('/blogs/new' , (req,res)=>{
    try{
        res.render('products/new');
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
})

// actually adding a product in a DB 
router.post('/blogs' , validateProduct , async (req,res)=>{
    console.log("hi")
    try{
        let {blogContent,authorName} = req.body;
        // let {furnitureName,img,price} = req.body;
        // server side validation switched to schema.js
        const productSchema = Joi.object({
            blogContent: Joi.string().required(),
            // furnitureName: Joi.string().required(),
            // img: Joi.string().trim(),
            // price: Joi.number().min(0).required(),
            authorName: Joi.string().trim()
        });
        const {error} = productSchema.validate({blogContent,authorName});
        // const {error} = productSchema.validate({furnitureName,img,price});
        console.log(error);
        await Product.create({blogContent,authorName});
        // await Product.create({furnitureName,img,price});
        res.redirect('/blogs');
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
})

// route for showing the details of the products
router.get('/blogs/:id' , async(req,res)=>{
    try{
        let {id} = req.params;
        let foundProduct = await Product.findById(id);
        // let foundProduct = await Product.findById(id).populate('reviews');
        console.log(foundProduct);
        res.render('products/show' , {foundProduct});
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
})

// route for editing the product so we need form for it
router.get('/blogs/:id/edit' , async(req,res)=>{
    try{
        let {id} = req.params;
        let foundProduct = await Product.findById(id);
        res.render('products/edit' , {foundProduct});
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
})

// changing the original edits in the database made in the editform 
router.patch('/blogs/:id', validateProduct, async(req,res)=>{
    try{
        let {id} = req.params;
        let {blogContent,authorName} = req.body;
        // let {furnitureName,img,price} = req.body;
        await Product.findByIdAndUpdate(id , {blogContent,authorName});
        // await Product.findByIdAndUpdate(id , {furnitureName,img,price});
        res.redirect(`/blogs/${id}`)
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
})

//delete a route
router.delete('/blogs/:id' , async(req,res)=>{
    try{
        let {id} = req.params;
        const product = await Product.findById(id);
        // for(let id of product.reviews){
        //     await Review.findByIdAndDelete(id);
        // }
        await Product.findByIdAndDelete(id);
        res.redirect('/blogs');
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
})

module.exports = router;