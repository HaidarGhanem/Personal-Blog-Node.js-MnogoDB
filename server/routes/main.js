const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//-------------------------------------------Home
router.get('/home', async (req,res)=>{
    const local = {
        title : "Blog Site | Home"
        ,description : "just training"
    }
    const data = await Post.find();
    res.render('index' , {local , data});
})

//-------------------------------------------Posts
router.get('/posts/:id', async (req,res)=>{
    const data = await Post.findById( {_id: req.params.id});
    const local = {
        title : "Blog Site | " + data.title
        ,description : "just training"
    }
    
    res.render('posts' , {local , data});
})

//-------------------------------------------Search
router.post('/search', async (req,res)=>{
try{
    const local = {
        title : "Blog Site | Search"
        ,description : "just training"
    }
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g,"");
    const data = await Post.find({
        $or:
        [
            {title: {$regex : new RegExp(searchNoSpecialChar,'i')}},
                {body: {$regex : new RegExp(searchNoSpecialChar,'i')}}
        ]
    })
    res.render('search' , {local , data});
}
catch(error){
    console.log(error);
}
})















module.exports = router  ;