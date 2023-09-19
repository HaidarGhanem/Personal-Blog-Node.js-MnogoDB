require('dotenv').config();

const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const connectDB = require('./server/config/db');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000 || process.env.PORT;

connectDB();

//configs
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static('public'));




//ejs layout config
app.use(expressEjsLayouts);
app.set('layout','./layouts/main');
app.set('view engine' , 'ejs');



app.use('/' , require('./server/routes/main'));
app.use('/' , require('./server/routes/intro'));
app.use('/' , require('./server/routes/admin'));


app.listen( PORT , ()=>{console.log(`server is running on port ${PORT}`)} );