const express = require("express");
const cors = require("cors");

const mongoose = require('mongoose');

const Jwt = require('jsonwebtoken');


const dotenv = require('dotenv');
dotenv.config();


const jwtKey = process.env.jwtKey;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
mongoose.connect(`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.fomyegu.mongodb.net/E-comm?retryWrites=true&w=majority`);




const User = require("./db/User");
const Product = require("./db/Product")

const app = express();


app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("app is running at port 5000");
})

//signup api 
app.post("/register",async (req,res)=>{
    let user = new User(req.body);
    let result = await user.save();
        Jwt.sign({result},jwtKey,(err,token)=>{
            if(err){
                res.send({result:"something went wrong please try after some time"})
            }
            res.send({result,auth:token})
        })
})

//login api
app.post('/login',async(req,res)=>{

    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select("-password");
        if(user){
            Jwt.sign({user},jwtKey,(err,token)=>{
                if(err){
                    res.send({result:"something went wrong please try after some time"})
                }
                res.send({user,auth:token})
            })
        }
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

// product list api
app.get("/products/:id",async (req,res)=>{
    let products= await Product.find({userId:req.params.id});
    if(products.length>0)
    res.send(products);
    else
    res.send({result:"no product found"})
})

// delete product api
app.delete("/product/:id",async(req,res)=>{
    const result = await Product.deleteOne({_id:req.params.id});
    res.send(result);
})
// getting single product
app.get("/product_update/:id",async(req,res)=>{
    let result = await Product.find({_id:req.params.id});
    if(result)
    res.send(result);
    else
    res.send({result:"no record found"})
})

app.put("/product/:id",async(req,res)=>{
    let result = await Product.updateOne(
        {_id:req.params.id},
            {
                $set:req.body
            }
    )
    res.send(result);
})

app.listen(5000);