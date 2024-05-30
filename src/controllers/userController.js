const {OTPService, verifyOTPService, saveProfileService, readProfileService} = require("../services/userServices");
exports.loginOTP = async (req,res) => {
    const result = await OTPService(req)
    return res.status(200).json(result)
}
exports.verifyOTP = async (req,res) => {
    const result = await verifyOTPService(req)
    if(result["status"]  === "success"){
        const cookieOption = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly:false
        }
        res.cookie("token",result['token'],cookieOption)
    }
    return res.status(200).json(result)
}
exports.logout = async (req,res) => {
    const cookieOption = {
        expires: new Date(Date.now() - 24 * 60 * 60 * 1000),
        httpOnly: false
    }
    res.cookie('token',"",cookieOption)
    return res.status(200).json({status:"success",message:"logout success"})
}
exports.createProfile = async (req,res) => {
    const result = await saveProfileService(req)
    return res.status(200).json(result)
}
exports.updateProfile = async (req,res) => {
    const result = await saveProfileService(req)
    return res.status(200).json(result)
}
exports.readProfile = async (req,res) => {
    const result = await readProfileService(req)
    return res.status(200).json(result)
}