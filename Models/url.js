import mongoose from 'mongoose';

const urlSchema=new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true,
    },
    redirectUrl:{
        type:String,
        required:true
    },
    totalClicks:[{timestamp:{type:Number}}],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},{
    timestamp:true
})

const url=mongoose.model('url',urlSchema);

export default url;