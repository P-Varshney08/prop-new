// to initialize our db with some dummy data

const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
    {
        name: "Iphone 15 pro max",
        img: "https://www.digitaltrends.com/wp-content/uploads/2023/09/iphone-15-pro-max-review-outside-leaves.jpg?resize=625%2C417&p=1",
        price: 10000,
        desc: "Apni salary se le lena"
    },
    {
        name: "Mirror",
        img: "https://i.localised.com/img/uo/product/12baec3a-d546-4c6a-aced-5986cc9a0eea_LARGE.jpg",
        price: 9000,
        desc: "mirror with make-up organizer"

    },
    {
        name: "Jewellary Box",
        img: "https://greecart.in/cdn/shop/files/3f7337d3-51e6-44b6-aa73-78e37055f95e_5ee785d1-1080-468c-aff4-2e20e4b35b05.jpg?v=1682668663&width=2048",
        price: 8000,
        desc: "Tumhe kya tum to makeup hi nhi krte ho"

    },
    {
        name: "Perfume",
        img: "https://m.media-amazon.com/images/I/61uOK5owU0L._AC_UF350,350_QL50_.jpg",
        price: 7000,
        desc: "nahalo isse accha"
    }
]

async function seedDB() {
    try {
        await Product.insertMany(products, { timeout: 20000 });
        console.log("Data seeded successfully.");
    } catch (error) {
        console.error("Error inserting data:", error);
    }
}

module.exports = seedDB;