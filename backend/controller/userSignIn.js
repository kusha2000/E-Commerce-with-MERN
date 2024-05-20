const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

async function userSignInController(req,res){
    try {
        const {email,password}=req.body

        if(!email){
            throw new Error("Please Provide email")
        }
        if(!password){
            throw new Error("Please Provide password")
        }
        const user=await userModel.findOne({email})

        if(!user){
            throw new Error("User not found")
        }

       const checkPassword= bcrypt.compareSync(password, user.password);

       console.log("Check Password",checkPassword);

       if(checkPassword){
            const tokenData={
                _id:user.id,
                email:user.email,
            }
            const token=await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 *8});

            const tokenOption={
                httpOnly:true,
                secure:true
            }

            res.cookie("token",token,tokenOption).json({
                message: "Login successfully",
                data:token,
                error:false,
                success:true
            })

       }else{
        throw new Error("Please check password")
       }

    } catch (error) {
        res.json({
            message: error.message || error,
            error:true,
            success:false
        })
    }
}   

module.exports=userSignInController