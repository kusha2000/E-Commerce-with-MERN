const uploadProductPermisson = require("../helper/permission")
const productModel = require("../models/productModel")

async function updateProductController(req,res){
    try {
        //this req.userId come from middleware authToken.js
        if(!uploadProductPermisson(req.userId)){
            throw new Error("Permisson denied")
        }

        const{_id,...resBody}=req.body

        const updateProduct =await productModel.findByIdAndUpdate(_id,resBody)

        res.json({
            message:"Product Update Sucessfully",
            error:false,
            success:true,
            data:updateProduct
        })

    } catch (error) {
        res.status(400).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}

module.exports=updateProductController