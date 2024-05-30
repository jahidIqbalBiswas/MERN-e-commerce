const {decodeToken} = require("../utility/tokenUtility");
module.exports = (req,res,next) => {
    const token = req.headers['token']|| req.cookies['token']
    // if(!token) {
    //     token = req.cookies['token']
    // }
    const decoded = decodeToken(token)
    if(decoded === null){
        res.status(401).json({
            status:"Failed",
            message:"Unauthorized"
        })
    }else{
        const email = decoded['email']
        const userID = decoded['userID']
        req.headers.email = email
        req.headers.userID = userID
        next()
    }
}