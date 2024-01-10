const express =  require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const {validateReview} = require('../middleware')

const router = express.Router();

router.post('/blogs/:productId/review' , validateReview, async(req,res)=>{
        try{
                let {productId} = req.params;
                let {rating , comment} = req.body;
                const product = await Product.findById(productId);
                console.log(product);
                // creating a new review
                const review  = new Review({rating , comment});
                // adding review id to product array
                product.reviews.push(review); //mongodb internally isme se id nikaal kr usse push krdega.
                await review.save();
                await product.save();
                res.redirect(`/blogs/${productId}`)
        }
        catch(e){
                res.status(500).render('error' ,{err:e.message})
        }      
})

module.exports = router;