import { nanoid } from "nanoid";
import url from "../Models/url.js";
export const CreateNewUrl=async(req,res)=>{
    try{
        const body=req.body;
        if(!body){
            return res.status(400).json({
                error:'url is reqiured'
            })
        }
        const shortId=nanoid(8);
        const find=await url.findOne({redirectUrl:body.url});
      
        if(find){
            return res.send('<h1>Sorry Short Url from it already exist</h1>');
        }
        await url.create({
            shortId,
            redirectUrl:body.url,
            totalClicks:[],
            createdBy:req.user._id
        })
        return res.render("home",{
            id:shortId,
        })
    }catch(err){
         console.log(err);
    }
}

export const totalClicks=async(req,res)=>{
    try{

    }catch(err){

    }
}

export const redirectToOriginal=async(req,res)=>{
    try{
        const shortId=req.params.id;
        
        const entry=await url.findOneAndUpdate({shortId},{
            $push:{
                totalClicks:{
                    timestamp:Date.now()
                }
            }
        },
        {new:true}
    )

        res.redirect(entry.redirectUrl);

    }catch(err){
        console.log("error in getting URL",url);
    }
}