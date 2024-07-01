import user from "../Models/user.js";
import { v4 as uuidv4 } from 'uuid';
import { setUser } from "../service/auth.js";

export const createUser=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const users=await user.find({});
        console.log(users);
        const findUser=await user.findOne({email});
        if(findUser){
            return res.send("<h1>User already exist</h1>")
        }
        await user.create({
            name,
            email,
            password
        })
        return res.render("home")

    }catch(err){
        console.log("error in creating user",err);
    }
}


export const handleUserSignin=async(req,res)=>{
  
    try{
        const {email,password}=req.body;
    
        const userM=await user.findOne({email,password});
         
        if(!userM){
            console.log("failed");
            return res.send("Check your email or passsword");
        }
       
        const token=setUser(user);
        res.cookie('uid',token);
        return res.redirect("/");

    }catch(err){
          console.log("failed to login",err);
    }

}

