import express from 'express';
import { auth } from '../../MiddleWare/auth.js';
import { Valdiation } from '../../MiddleWare/valdition.js';
import { DeleteUser, forgetPassword, getUserData, ResetPassword, SignIn, SignUp, UpdatePassword, UpdateUser, Verfy } from './user.controller.js';
import { signInSchema, signUpSchema } from './Valdition/valdition.schema.js';


const router = express.Router();


router.post("/signup",Valdiation(signUpSchema),SignUp)

router.post("/signin",Valdiation(signInSchema),SignIn)

router.put("/Reset",ResetPassword)

router.post("/ForgetPassword",forgetPassword)

router.get("/:token",Verfy)

router.post("/getUser",auth,getUserData)

router.put("/updateUser",auth,UpdateUser)

router.put("/updatePassword",auth,UpdatePassword)

router.delete("/deleteUser",auth,DeleteUser)



export default router;