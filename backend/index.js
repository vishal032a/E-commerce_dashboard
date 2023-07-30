const express = require("express");
const cors = require("cors");

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
mongoose.connect(`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.fomyegu.mongodb.net/E-comm?retryWrites=true&w=majority`);



const User = require("./db/User");
const Product = require("./db/Product")

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("app is running at port 5000");
})

//signup api 
app.post("/register",async (req,res)=>{
    let user = new User(req.body);
    let result = await user.save();
    res.send(result);
})

//login api
app.post('/login',async(req,res)=>{

    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select("-password");
        if(user)
            res.send(user);
        else
            res.send({result:'No user found'});
    }
    else
    res.send({result:"No user found"});
})

//add product api
app.post("/add-product",async(req,res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})

app.get("/products/:id",async (req,res)=>{
    // console.log(req.params.id);
    // res.send({result:"value recived"});
    let products= await Product.find({userId:req.params.id});
    if(products.length>0)
    res.send(products);
    else
    res.send({result:"no product found"})
})

app.listen(5000);