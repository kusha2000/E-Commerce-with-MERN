const uploadProductPermisson = require("../helper/permission")
const productModel = require("../models/productModel")

async function UploadProductController(req,res){
    try {

        const sessionUserId=req.userId
        if(!uploadProductPermisson(sessionUserId)){
            throw new Error("Permisson denied")
        }
        
        const uploadProduct=new productModel(req.body)
        const saveProduct=await uploadProduct.save()

        res.status(201).json({
            message:"Product upload sucessfully",
            success:true,
            error:false,
            data:saveProduct,
        })
    } catch (error) {
        res.status(400).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}

module.exports=UploadProductController