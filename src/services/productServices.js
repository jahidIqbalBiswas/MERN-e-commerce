const brandModel = require("../models/brandModel");
const categoryModel = require("../models/categoryModel");
const productSliderModel = require("../models/productSliderModel");
const productDetailsModel = require("../models/productDetailsModel");
const productModel = require("../models/productModel");
const productReviewModel = require("../models/productReviewModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId


const brandListService = async () => {
    try{
        const data = await brandModel.find()
        return {status:"success",data}
    }
    catch(err){
        return {status:"fail",err}
    }
}
const categoryListService = async () => {
    try{
        const data = await categoryModel.find()
        return {status:"success",data}
    }
    catch(err){
        return {status:"fail",err}
    }
}
const sliderListService = async () => {
    try{
        const data = await productSliderModel.find()
        console.log(data)
        return {status:"success",data}
    }
    catch(err){
        return {status:"fail",err}
    }
}


const listByBrandService = async (req) => {
    try{
        const brandID = new ObjectId(req.params["brandID"])
        const matchStage = {$match:{brandID:brandID}}
        const joinWithBrandStage = {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}}
        const joinWithCategoryStage = {$lookup:{from:"categories",localField:"categoryID",foreignField: "_id",as:"category"}}
        const unwindBrandStage = {$unwind:"$brand"}
        const unwindCategoryStage = {$unwind: "$category"}
        const projectionStage = {$project:{"categoryID":0,"brandID":0,"brand._id":0,"brand.createdAt":0,"brand.updatedAt":0,"category._id":0,"category.createdAt":0,"category.updatedAt":0}}
        const data = await productModel.aggregate([
            matchStage,joinWithBrandStage,joinWithCategoryStage,unwindBrandStage,unwindCategoryStage,projectionStage
        ])
        return {status:"success",data}
    }
    catch(err){
        return {status:"fail",err}
    }
}
const listByCategoryService = async (req) => {
    try{
        const catID = new ObjectId(req.params['catID'])
        const matchStage = {$match:{categoryID:catID}}
        const joinWithCategoryStage = {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}}
        const joinWithBrandStage = {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}}
        const unwindBrandStage = {$unwind:"$brand"}
        const unwindCategoryStage = {$unwind:"$category"}
        const projectionStage = {$project:{"categoryID":0,"brandID":0,"category._id":0,"category.createdAt":0,"category.updatedAt":0,"brand._id":0,"brand.createdAt":0,"brand.updatedAt":0}}
        const data = await productModel.aggregate([
            matchStage,joinWithCategoryStage,joinWithBrandStage,unwindCategoryStage,unwindBrandStage,projectionStage
        ])
        return {status:"success",data}
    }
    catch(err){
        return {status:"fail",err}
    }
}
const listByRemarkService = async (req) => {
    try{
        const remark = req.params['remark']
        const matchStage = {$match:{remark:remark}}
        const joinWithBrandStage = {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}}
        const joinWithCategoryStage = {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}}
        const unwindBrandStage = {$unwind:"$brand"}
        const unwindCategoryStage = {$unwind:"$category"}
        const projectionStage = {$project:{
                "categoryID": 0,
                "brandID": 0,
                "brand._id": 0,
                "brand.createdAt": 0,
                "category.createdAt": 0,
                "brand.updatedAt": 0,
                "category.updatedAt": 0
            }}
        const data = await productModel.aggregate([
            matchStage,joinWithBrandStage,joinWithCategoryStage,unwindBrandStage,unwindCategoryStage,projectionStage
        ])
        return {status:"success",data}
    }
    catch(err){
        return {status:"fail",err}
    }
}


const listBySimilarService = async (req) => {
    try {
        const categoryID = new ObjectId(req.params['catID'])
        const matchStage = {$match: {categoryID}}
        const limitStage = {$limit: 5}
        const joinWithBrandStage = {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}}
        const joinWithCategoryStage = {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}}
        const unwindBrandStage = {$unwind:"$brand"}
        const unwindCategoryStage = {$unwind:"$category"}
        const projectionStage = {$project:{"categoryID":0,"brandID":0,"createdAt":0,"updatedAt":0,"brand._id":0,"brand.createdAt":0,"brand.updatedAt":0,"category._id":0,"category.createdAt":0,"category.updatedAt":0}}
        const data = await productModel.aggregate([
            matchStage,limitStage,joinWithBrandStage,joinWithCategoryStage,unwindBrandStage,unwindCategoryStage,projectionStage
        ])
        return {status:"success",data}
    }catch(err){
        return {status:"fail",err}
    }
}
const productDetailsService = async (req) => {
    try{
        const productID = new ObjectId(req.params['productID'])
        const matchStage = {$match:{_id:productID}}
        const joinWithProductsDetailsStage = {$lookup:{from:"productsDetails",localField:"_id",foreignField:"productID",as:"details"}}
        const joinWithBrandStage = {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}}
        const joinWithCategoryStage = {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}}
        const unwindDetailsStage = {$unwind:"$details"}
        const unwindBrandStage = {$unwind:"$brand"}
        const unwindCategoryStage = {$unwind:"$category"}
        const projectionStage = {$project:{"createdAt":0,"updatedAt":0,"categoryID":0,"brandID":0,"brand.createdAt":0,"brand.updatedAt":0,"category.createdAt":0,"category.updatedAt":0,"details._id":0,"details.createdAt":0,"details.updatedAt":0,"details.productID":0}}
        const data = await productModel.aggregate([
            matchStage,joinWithProductsDetailsStage,joinWithBrandStage,joinWithCategoryStage,unwindDetailsStage,unwindBrandStage,unwindCategoryStage,projectionStage
        ])
        return {status:"success",data}
    }
    catch (err){
        return {status:"fail",err}
    }
}
const listByKeywordService = async (req) => {
    try{
        const searchRegex = {$regex:req.params.keyword,$options:"i"}
        const searchParams = [{title:searchRegex},{shortDes:searchRegex}]
        const searchQuery = {$or:searchParams}
        const matchStage = {$match:searchQuery}
        const joinWithBrandStage = {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}}
        const joinWithCategoryStage = {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}}
        const unwindBrandStage = {$unwind:"$brand"}
        const unwindCategoryStage = {$unwind:"$category"}
        const projectionStage = {$project:{
                "categoryID": 0,
                "brandID": 0,
                "brand._id": 0,
                "brand.createdAt": 0,
                "category.createdAt": 0,
                "brand.updatedAt": 0,
                "category.updatedAt": 0
            }}
        const data = await productModel.aggregate([
            matchStage,joinWithBrandStage,joinWithCategoryStage,unwindBrandStage,unwindCategoryStage,projectionStage
        ])
        return {status:"success",data}
    }
    catch (err){
        return {status:"fail",err}
    }
}
const reviewListService = async (req) => {
    try{
        const productID = new ObjectId(req.params.productID)
        const matchStage = {$match:{productID}}
        const joinWithProfileStage = {$lookup:{from:"profiles",localField:"userID",foreignField:"userID",as:"profile"}}
        const unwindProfileStage = {$unwind:"$profile"}
        const projectionStage = {$project:{"_id":0,"des":1,"rating":1,"profile.cus_name":1}}
        const data = await productReviewModel.aggregate([
            matchStage,joinWithProfileStage,unwindProfileStage,projectionStage
        ])
        return {status:"success",count:data.length,data}
    }
    catch (err) {
        return {status:"fail",err}
    }
}
// const listByFilterService = async () => {
//
// }

module.exports = {
    brandListService,
    categoryListService,
    sliderListService,
    listByBrandService,
    listByCategoryService,
    listByRemarkService,
    listByKeywordService,
    listBySimilarService,
    reviewListService,
    productDetailsService,
}