const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const adminlayout = '../views/layouts/admin';


router.get('/admin', async (req,res)=>{
    const local = {
        title : 'Admin dashboard'
    }
    const data = await Post.find();
    res.render('admin/dashboard' , {local , layout : adminlayout,data});
});

//---------------------------------------


router.get('/post/:id', async (req,res)=>{
    const data = await Post.findById( {_id: req.params.id});
    const local = {
        title : "Admin | " + data.title
        ,description : "just training"
    }
    
    res.render('admin/post' , {local , data , layout:adminlayout});
})

//---------------------------------------

router.get('/add-post',async (req,res)=>{
    const local = {
        title : "Adding Post"
    }
    
    res.render('admin/add-post' , {local , layout:adminlayout});
})

//----------------------------------------

router.post('/add-post', async(req,res)=>{
    try{
        const NewPost = {
            title : req.body.title,
            body  : req.body.body
        }
        await Post.create(NewPost);
        res.redirect('/admin');
    }catch(err){
        console.log(err);
    }
})

//---------------------------------------
router.get('/edit-post/:id', async (req,res)=>{
    const data = await Post.findById({_id:req.params.id})
    const local ={
        title : "Edit" | data.title
    }
    res.render('admin/edit-post', {local , data , layout:adminlayout})
})

//---------------------------------------
router.put('/edit-post/:id', async(req,res)=>{
    
    try{
        const NewPost = {
            title : req.body.title,
            body  : req.body.body,
        }
        await Post.findByIdAndUpdate(req.params.id,NewPost);
        res.redirect('/admin');
    }catch(err){
        console.log(err);
    }
})
//---------------------------------------
router.delete('/delete-post/:id', async (req,res)=>{
    try{
        await Post.findByIdAndDelete({_id:req.params.id});
        res.redirect('/admin');
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router;