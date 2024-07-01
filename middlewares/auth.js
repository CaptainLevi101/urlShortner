import { getUser } from "../service/auth.js";

export const restrictToLoggedInUserOnly=async(req,res,next)=>{
    try{
        const userId=req.cookies?.uid;
        if(!userId)return res.redirect("/login");
         const user=getUser(userId);
         if(!user){
            return res.redirect('/login');
         }
         req.user=user;
         next();
    }catch(err){
           console.log("error in LoginMiddleware",err);
    }
}