const cartModel = require("../models/cartModel");
const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId
exports.addToCartService = async (req) => {
    try{
        const userID = req.headers['userID']
        const reqBody = req.body
        reqBody['userID'] = userID
        await cartModel.create(reqBody)
        return {status:"success",message:"product added to cart"}
    }
    catch (e){
        return {status:"fail",message:"something went wrong"}
    }
}
exports.removeFromCartService = async (req) => {
    try{
        const userID = req.headers['userID']
        const reqBody = req.body
        reqBody['userID'] = userID
        await cartModel.deleteOne(reqBody)
        return {status:"success",message:"item removed from cart"}
    }
    catch (e) {
        return {status:"fail",message:"something went wrong"}
    }
}
exports.updateCartService = async (req) => {
    try{
        const userID = req.headers['userID']
        const cartID = req.params['cartID']
        const reqBody = req.body;
        await cartModel.updateOne({userID,_id:cartID},{$set:reqBody})
        return {status:"success",message:"cart updated successfully"}
    }
    catch (e) {
        return {status:"fail",message:"something went wrong"}
    }
}
exports.readCartService = async (req) => {
    try{
        const userID = new ObjectID(req.headers['userID'])
        const matchStage = {$match:{userID}}
        const joinWithProductStage = {$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}}
        const joinWithBrandStage = {$lookup: {from:"brands",localField: "product.brandID",foreignField: "_id",as:"brand"}}
        const joinWithCategoryStage = {$lookup:{from:"categories",localField:"product.categoryID",foreignField:"_id",as:"category"}}
        const unwindProductStage = {$unwind:"$product"}
        const unwindBrandStage = {$unwind:"$brand"}
        const unwindCategoryStage = {$unwind:"$category"}
        const projectionStage = {
            $project:{
                "_id":0,
                "userID":0,
                "productID":0,
                "createdAt":0,
                "updatedAt":0,
                "product._id":0,
                "product.categoryID":0,
                "product.brandID":0,
                "product.createdAt":0,
                "product.updatedAt":0,
                "brand._id":0,
                "brand.createdAt":0,
                "brand.updatedAt":0,
                "category._id":0,
                "category.createdAt":0,
                "category.updatedAt":0
            }
        }
        const data = await cartModel.aggregate([
            matchStage,joinWithProductStage,joinWithBrandStage,joinWithCategoryStage,unwindProductStage,unwindBrandStage,unwindCategoryStage,projectionStage
        ])
        return {status:"success",data}
    }
    catch (e) {
        return {status:"fail",message:"something went wrong"}
    }
}