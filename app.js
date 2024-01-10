const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed');
const productRoutes = require("./routes/productRoutes");
const ejsMate = require('ejs-mate');
const methodOverride  = require('method-override');
const reviewRoutes = require("./routes/review");
const session = require('express-session');
const authRoutes = require("./routes/authRoutes");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User =  require('./models/User');
require('dotenv').config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;


mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URI) //returns a promise
.then(()=>{console.log("DB connected")})
.catch((err)=>{console.log(err)})

app.engine('ejs' , ejsMate);
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname,'views'));
// now for public folder
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

// seeding dummy data
// seedDB();

let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}

app.use(session(configSession));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new LocalStrategy(User.authenticate()));
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

// Routes
app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);

app.listen(PORT,()=>{
    console.log(`server connected at port : ${PORT}`);
})