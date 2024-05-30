const wishModel = require("../models/wishModel");
const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;
exports.saveWishListService = async (req) => {
   try{
       const userID = req.headers['userID']
       const productID = req.body['productID']
       await wishModel.updateOne({userID,productID},{$set:{productID}},{upsert:true})
       return {status:"success",message:"product added to wishlist"}
   }
   catch (e) {
       return {status:"fail",message:"something went wrong"}
   }
}
exports.removeWishListService = async (req) => {
   try{
       const userID = req.headers["userID"]
       const productID = req.body["productID"]
       await wishModel.deleteOne({userID,productID})
       return {status:"success",message:"product removed from wishlist."}
   }
   catch (e){
       return {status:"fail",message:"something went wrong"}
   }
}
exports.readWishListService = async (req) => {
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
        const data = await wishModel.aggregate([
            matchStage,joinWithProductStage,joinWithBrandStage,joinWithCategoryStage,unwindProductStage,unwindBrandStage,unwindCategoryStage,projectionStage
        ])
        return {status:"success",data}
    }
    catch (e) {
        return {status:"fail",message:"something went wrong"}
    }
}
