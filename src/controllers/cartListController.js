const {addToCartService, removeFromCartService, updateCartService, readCartService} = require("../services/cartListServices");
exports.addToCart = async (req,res) => {
    const result = await addToCartService(req)
    return res.status(200).json(result)
}
exports.removeFromCart = async (req,res) => {
    const result = await removeFromCartService(req)
    return res.status(200).json(result)
}
exports.updateCart = async (req,res) => {
    const result = await updateCartService(req)
    return res.status(200).json(result)
}
exports.readCart = async (req,res) => {
    const result = await readCartService(req)
    return res.status(200).json(result)
}