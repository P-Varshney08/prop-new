const Joi = require("joi");

const productSchema = Joi.object({
    blogContent: Joi.string().required(),
    // furnitureName: Joi.string().required(),
    // img: Joi.string().trim(),
    // price: Joi.number().min(0).required(),
    authorName: Joi.string().trim()
});

const reviewSchema = Joi.object({
    rating:Joi.number().min(0).max(5), 
    comment: Joi.string().required()
})

module.exports = { productSchema , reviewSchema } ;