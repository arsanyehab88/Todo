import { UserModel } from "../../../DB/Models/UserModel/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { nanoid } from "nanoid";
import { HTML } from "../../Email/html.js";
import { FHtml } from "../../ForgetPassword/ForgetHtml.js";
import { sendEmail } from "../../Email/Email.js";






export const SignUp = async (req, res) => {
    try {
        const { name, email, password, age } = req.body;
        let token = jwt.sign({ email }, process.env.SECURTY_SERVICE)
        let exist = await UserModel.findOne({ email });
        if (exist) return res.json({ message: "Email already exist" });
        let hashpass = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
        let user = UserModel.insertMany({ name, email, password: hashpass, age })
        sendEmail(email, "confirm Email", HTML(token))
        res.json({ message: "Done", user })
    } catch (err) {
        res.json({ message: "err", err });
    }
}


export const Verfy = async (req, res) => {
    try {
        const { token } = req.params;
        jwt.verify(token, process.env.SECURTY_SERVICE, async (err, decoded) => {
            if (err) return res.json({ message: "err", err })
            let user = await UserModel.findOneAndUpdate({ email: decoded.email }, { CEmail: true }, { new: true })
            user.password = undefined
            res.json({ message: "Done", user })
        })
    } catch (err) {
        res.json({ message: "err", err })
    }


}


export const UpdatePassword = async (req, res) => {
    try {
        const { newPassword, ConfirmPassword } = req.body;
        let check = await UserModel.findOne({ _id: req.userId })
        let hashed = bcrypt.compareSync(newPassword, check.password)
        if (hashed) return res.json({ message: "Password is match old password" })
        if (newPassword !== ConfirmPassword) return res.json({ message: "Password does not match" })
        let hashPassword = await bcrypt.hash(newPassword, Number(process.env.SALT_ROUNDS));
        let exist = await UserModel.findOneAndUpdate({ _id: req.userId }, { password: hashPassword }, { new: true })
        if (!exist) return res.json({ message: "User does not exist" })

        res.json({ message: "Done", exist })
    } catch (err) {
        console.log(err);
        res.json({ message: "err", err })
    }
}




export const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body
        const code = nanoid(4)
        let exist = await UserModel.findOne({ email });
        if (!exist) return res.json({ message: "Email does not exist" })
        if (exist.CEmail === false) return res.json({ message: "Email Not Verfied" })
        let user = await UserModel.findOneAndUpdate({ email }, { code }, { new: true })
        sendEmail(email, "Forget Password", FHtml(code))
        res.json({ message: "Go To Mail To Reset" })
    }
    catch (err) {
        res.json({ message: "err", err })
    }
}
export const ResetPassword = async (req, res) => {
    try {
        const { codes, newPassword, ConfirmPassword } = req.body
        console.log(codes, newPassword, ConfirmPassword);
        let exist = await UserModel.findOne({ codes })
        if (!exist) return res.json({ message: "Code does not exist" })
        //if (exist.CEmail === false) return res.json({ message: "Email Not Verfy" })
        let result =  bcrypt.compareSync(newPassword, exist.password)
        if (result) return res.json({ message: "Password  match old password" })
        if (newPassword !== ConfirmPassword) return res.json({ message: "Password does not match" })
        let hashPassword = await bcrypt.hash(newPassword, Number(process.env.SALT_ROUNDS))
        let updateOne = await UserModel.findOneAndUpdate({ codes }, { password: hashPassword, code: "" }, { new: true })
        res.json({ message: "Done", updateOne })

    } catch (err) {
        res.json({ message: "err", err })
    }
}

export const SignIn = async (req, res) => {
    try {
        const { email, password } = req.body
        let exist = await UserModel.findOne({ email });
        if (!exist) return res.json({ message: "Email is wrong or Not Exist" })
        let result = bcrypt.compareSync(password, exist.password);
        if (!result) return res.json({ message: "Password is wrong" })
        if (exist.CEmail === false) return res.json({ message: "Email Not Verfied" })
        let token = jwt.sign({ Email: exist.email, Name: exist.name, userId: exist._id }, process.env.KEY)
        res.json({ message: "Done", token })
    }
    catch (err) {
        res.json({ message: "err", err });
    }
}


export const UpdateUser = async (req, res) => {
    try {
        const { name, age } = req.body;
        let user = await UserModel.updateOne({ _id: req.userId }, { name, age })
        res.json({ message: "Done", user });
    } catch (err) {
        res.json({ message: "err", err });
    }
}






export const DeleteUser = async (req, res) => {
    try {
        let user = await UserModel.deleteOne({ _id: req.userId })
        res.json({ message: "Done", user });
    } catch (err) {
        res.json({ message: "err", err });
    }
}

export const getUserData = async(req,res)=>{
    try{
        let user = await UserModel.findOne({ _id: req.userId})
        //if(!user)return res.json({message: "User not found"})
        res.json({ message: "Done", user })
    }catch (err) {
        console.log(err);
        res.json({ message: "err", err });
    }
}