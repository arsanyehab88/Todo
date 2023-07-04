
import { PhotoModel } from "../../../DB/Models/PhotoModel/Photo.model.js"
import cloudinary from "../../utils/cloudinary.js"



export const AddPhoto = async (req, res, next) => {
    try{
        let {email}=req.body
        console.log(email);
        let { secure_url } = await cloudinary.uploader.upload(req.file.path)
        let photo = await PhotoModel.insertMany({ path: secure_url,createdBy:email })
        if (!req.file) return res.json({ message: "Invalid File" })
        res.json({ message: "Done", photo })
    }catch(err){
        res.json({message:"Error",err})
        console.log(err);
    }
}


export const DeletePhoto = async (req, res, next) => {
    try{
        let exist = await PhotoModel.findByIdAndDelete({ _id:req.userId })
        if(!exist) return res.json({message:"Not Found"})
        res.json({message:"Done",exist})

    }catch(err){
        res.json({message:"Error",err})
    }
}   