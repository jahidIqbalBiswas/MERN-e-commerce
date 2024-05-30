const jwt = require("jsonwebtoken")
exports.encodeToken = (email,userID) => {
    const KEY = "123-ABC-xyz"
    const EXPIRE = {expiresIn: "24h"}
    const PAYLOAD = {
        email:email,
        userID:userID
    }
    return jwt.sign(PAYLOAD,KEY,EXPIRE)
}

exports.decodeToken = (token) => {
    try{
        const KEY = "123-ABC-xyz"
        return jwt.verify(token,KEY)
    }
    catch (e) {
        return null
    }
}