const express = require('express');
const router = express.Router();
const introlayout = '../views/layouts/intro';
const User = require('../models/User');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtsecret = process.env.JWT_Secret;
router.get('/',(req,res)=>{
    const local = {
        title : "Welcome"
    }
    res.render('intro/welcome',{local , layout:introlayout})
})



//------------------------------------------
router.post('/register' , async (req,res)=>{
    const {username,password} = req.body;
    const hashedpassword = await bycrypt.hash(password,10);
    try{
        const user = await User.create({username , password : hashedpassword});
        res.redirect('/admin')
    }
    catch(err){
        console.log(err);
    }

})
//-------------------------------------------------
router.post('/signin' , async (req,res)=>{
    const {username,password} = req.body;
    const user = await User.findOne({username});
    if(!user){
        return  res.send("User is not exists");
    }
    const isPassword = await bycrypt.compare(password,  user.password)
    if(!isPassword){
        return res.send("Invalid Password");
    }
    else{
    res.redirect('/admin');}
})
module.exports = router;