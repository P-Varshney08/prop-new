const mongoose =  require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        trim : true
    },
    // username: String,
    // password: String,

    // is_buyer: String,
    // age: Number,
    // phone: String,
    // fav_color: String

    gender: String,
    AadharNumber: Number,
    age: Number,
    address: String,
});

userSchema.plugin(passportLocalMongoose);

let User = mongoose.model('User' , userSchema);
module.exports = User;