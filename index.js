import express from 'express';
import bodyParser from 'body-parser';
import url from './Routes/url.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import staticRouter from './Routes/staticRouter.js';
import user from './Routes/user.js';
import { redirectToOriginal } from './controllers/url.js';
import { restrictToLoggedInUserOnly } from './middlewares/auth.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app=express();
const router=express.Router();
const PORT=3000;

app.set('view engine','ejs');  // hmne apni app ko btaa diya h ki hm ejs engine use krne vaale hn
app.set('views',path.resolve('./views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(cookieParser());
app.use("/url",restrictToLoggedInUserOnly,url);
app.use('/',staticRouter);
app.use('/user',user);
app.get("/test",async(req,res)=>{
    return res.render('home');
})

const connection=process.env.CONNECTION_URL;
const startServer=async()=>{
    try{
        await mongoose.connect(connection);
        console.log("connected to mongoDb");
        app.listen(PORT,()=>{
            console.log(`Server running on port ${PORT}`);
        })
    }catch(err){
        console.error(`error connecting to mongo`,err.message);
    }
}
startServer();