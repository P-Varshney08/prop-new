// const mongoose = require('mongoose');
// const Review = require('./Review');

// const productSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         trim:true,
//         required:true
//     },
//     img:{
//         type:String,
//         trim:true,
//         default:'/images/proj_dummy_img.avif'
//     },
//     price:{
//         type:Number,
//         min:0,
//         default:null,
//         required:true
//     },
//     desc:{
//         type:String,
//         trim:true
//     },
//     reviews:[
//         {
//             type:mongoose.Schema.Types.ObjectId,
//             ref:'Review'
//         }
//     ]
// });

// productSchema.post('findOneAndDelete' , async function(product){
//     if(product.reviews.length > 0){
//         await Review.deleteMany({_id:{$in:product.reviews}})
//     }
// })

// let Product = mongoose.model('Product' , productSchema);
// module.exports = Product;


const mongoose = require('mongoose');
const Review = require('./Review');

const productSchema = new mongoose.Schema({
    // furnitureName:{
    //     type:String,
    //     trim:true,
    //     required:true
    // },
    // img:{
    //     type:String,
    //     trim:true,
    //     required:true,
    //     default:'/images/proj_dummy_img.avif'
    // },
    // price:{
    //     type:Number,
    //     min:0,
    //     // default:null,
    //     required:true
    // },


    blogContent:{
        type:String,
        required:true,
        trim:true
    },
    authorName:{
        type:String,
        required:true,
        trim:true
    }
    // desc:{
    //     type:String,
    //     trim:true
    // },
    // reviews:[
    //     {
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:'Review'
    //     }
    // ]
}, {timestamps:true});

// productSchema.post('findOneAndDelete' , async function(product){
//     if(product.reviews.length > 0){
//         await Review.deleteMany({_id:{$in:product.reviews}})
//     }
// })

let Product = mongoose.model('Product' , productSchema);
module.exports = Product;