const sendMail = require("../utility/mailSenderUtility");
const userModel = require("../models/userModel");
const {encodeToken} = require("../utility/tokenUtility");
const profileModel = require("../models/profileModel");
const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId
const OTPService = async (req) => {
    try{
        const email = req.params['email']
        const otp = Math.floor(100000 + Math.random() * 900000)
        const mailSubject = "Login OTP"
        const mailText = `Your OTP code is ${otp}. Never share this code anyone else.`
        await sendMail(email,mailSubject,mailText)
        await userModel.updateOne({email},{$set:{otp}},{upsert:true})
        return {status:"success",message:"OTP Send success."}
    }catch (e) {
        return {status:"fail",message:"Something went wrong."}
    }
}
const verifyOTPService = async (req) => {
    try{
        const email = req.params['email']
        const otp = req.params['otp']
        const findUser = await userModel.find({email,otp})
        if(findUser.length === 1){
            const userID = findUser[0]['_id'].toString()
            const token = encodeToken(email,userID)
            await userModel.updateOne({email},{$set:{otp:"0"}})
            return {status:"success",message:"Authentication success",token}
        }else{
            return {status:"fail",message:"OTP is not valid"}
        }
    }catch (e) {
        return {status:"fail",message:"Authentication failed"}
    }
}
const saveProfileService = async (req) => {
    try{
        const userID = req.headers['userID']
        const reqBody = req.body
        reqBody['userID'] = userID
        await profileModel.updateOne({userID},{$set:reqBody},{upsert:true})
        return {status:"success",message:"Profile saved success"}
    }
    catch (e) {
        return {status:"fail",message:"Something went wrong"}
    }

}
const readProfileService = async (req) => {
    try{
        const userID = new ObjectID(req.headers.userID)
        const matchStage = {$match:{userID}}
        const projectionStage = {$project: {"_id": 0}}
        const data = await profileModel.aggregate([
            matchStage,projectionStage
        ])
        return {status:"success",data:data[0]}
    }
    catch (e) {
        return {status:"fail",message:"Something went wrong"}
    }
}
module.exports = {
    OTPService,
    verifyOTPService,
    saveProfileService,
    readProfileService
}