const express =  require('express');
const User = require('../models/User');
const passport = require('passport')

const router = express.Router();

router.get('/register' , (req,res)=>{
    res.render('auth/signup');
})

// router.post('/register' ,async (req,res)=>{
//     try{
//       let {username , email , password, is_buyer, age, phone, fav_color} = req.body;
//       let newuser = new User({username , email, is_buyer, age, phone, fav_color});
//       // let {username, password} = req.body;
//       let newUser = await User.register(newuser , password)
      
//       console.log(newUser);
//       res.render('auth/login');
//     }
//     catch{
//       res.render('auth/exits');
//     }
// })
router.get('/', (req, res) => {
  return res.redirect("/login");
})

router.post('/register', async (req, res) => {
  try {
      let { username, email, password, gender, age, AadharNumber, address } = req.body;
      // let { username, email, password, is_buyer, age, phone, fav_color } = req.body;
      let newuser = new User({ username, email, gender, age, AadharNumber, address });
      let newUser = await User.register(newuser, password);
      console.log(newUser);
      res.render('auth/login');
  } catch (error) {
      console.error(error);
      res.render('auth/exits');
  }
}); 

router.get('/login' , (req,res)=>{
    res.render('auth/login')
})

router.post('/login', 
  passport.authenticate('local', 
  { 
    failureRedirect: '/login',
    failureMessage: 'Login Failed'
  }),
  function(req, res) {
    console.log(req.user , "new")
    res.redirect('/blogs');
  }
);

router.get('/logout',(req,res)=>{
  ()=>{
      req.logout();
  }
  res.redirect('/login');
});


module.exports = router;