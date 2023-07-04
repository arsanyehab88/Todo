import mongoose from "mongoose";


const UserSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    age:Number,
    CEmail:{
       type:Boolean,
        default:false
    },
    code:{
        type:String,
        default:""
    }

},{
    timestamp:true
})

export const UserModel=mongoose.model("user",UserSchema)

  