const mongoose = require('mongoose');
const dataSchema = mongoose.Schema({
    categoryName:{type:String,unique:true,required:true},
    categoryImg:{type:String,required:true}
},{timestamps:true,versionKey:false});
const categoryModel = mongoose.model("categories",dataSchema);
module.exports = categoryModel;