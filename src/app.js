const express = require('express');
const path = require('path');
const conn = require('./db/conn.js');
const hbs = require('hbs');
const User = require("./model/schema")

const app = express();
const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

app.use('/cs',express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")));
app.use(express.urlencoded({extended: false}))
app.set("view engine","hbs"); //this line alone is used when views file was not inside template
app.set("views",templatePath);
hbs.registerPartials(partialPath);
app.use(express.static(staticPath)); //for static website and for just using the css file
   

const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.render("index");
});

app.get('/services',(req,res)=>{
    res.render("services")
})

app.get('/contact',(req,res)=>{
    res.render("contact");
});

app.post("/contact",async(req,res) =>{
    try{
        // res.send(req.body)
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("index");
    }
    catch{
        res.status(500),send(error);
    }
})

app.listen(PORT,()=>{
    console.log(`Server is running at port number ${PORT}`);
});