const addToCartModel = require("../models/cartProduct")

const deleteAddToCartProduct=async(req,res)=>{
    try {
        const currentUserId=req.userId
        const addToCartProductId=req.body._id

        const deleteProduct=await addToCartModel.deleteOne({_id : addToCartProductId})

        res.json({
            message:"Product Deleted from Cart",
            error:false,
            success:true,
            data:deleteProduct
        })


    } catch (error) {
        res.status(400).json({
            message:error?.message || error,
            error:true,
            success:false
        })
    }
}

module.exports=deleteAddToCartProduct