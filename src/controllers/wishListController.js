const {saveWishListService, removeWishListService, readWishListService} = require("../services/wishListServices");
exports.saveWishList = async (req,res) => {
    const result = await saveWishListService(req)
    return res.status(200).json(result)
}
exports.removeWishList = async (req,res) => {
    const result = await removeWishListService(req)
    return res.status(200).json(result)
}
exports.readWishList = async (req,res) => {
    const result = await readWishListService(req)
    return res.status(200).json(result)
}
