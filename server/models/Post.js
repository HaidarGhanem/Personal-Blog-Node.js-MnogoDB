const mongoose = require('mongoose');

const Shema = mongoose.Schema;
const PostShema = new Shema({
    title: {
        type : String,
        required: true
    },
    body: {
        type : String,
        required: true
    },
    createdAt: {
        type: Date , 
        default : Date.now
    },
    updatedAt: {
        type: Date ,
        default : Date.now
    }
});

module.exports = mongoose.model('Post' , PostShema);