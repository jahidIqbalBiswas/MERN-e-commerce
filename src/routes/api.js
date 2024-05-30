const router = require('express').Router();
const {productBrandList,productCategoryList,productSliderList,productListByBrand,productListByCategory,productListByRemark,productListByKeyword,productListBySimilar,productListByFilter,productReviewList,productDetails} = require("../controllers/productController");
const userController = require("../controllers/userController");
const authVerifyMiddleware = require("../middlewares/authVerifyMiddleware")
const wishListController = require("../controllers/wishListController");
const cartListController = require("../controllers/cartListController");

// Product APIs
router.get("/productBrandList",productBrandList)
router.get("/productCategoryList",productCategoryList)
router.get("/productSliderList",productSliderList)
router.get("/productListByBrand/:brandID",productListByBrand)
router.get("/productListByCategory/:catID",productListByCategory)
router.get("/productListByRemark/:remark",productListByRemark)
router.get("/productListBySimilar/:catID",productListBySimilar)
router.get("/productDetails/:productID",productDetails)
router.get("/productListByKeyword/:keyword",productListByKeyword)
router.get("/productReviewList/:productID",productReviewList)
/* router.get("/productListByFilter",productListByFilter) */
// User APIs
router.get("/login/:email",userController.loginOTP)
router.get("/verifyLogin/:email/:otp",userController.verifyOTP)
router.get("/logout",authVerifyMiddleware,userController.logout)
router.post("/createProfile",authVerifyMiddleware,userController.createProfile)
router.post("/updateProfile",authVerifyMiddleware,userController.updateProfile)
router.post("/readProfile",authVerifyMiddleware,userController.readProfile)
// WishList
router.post("/saveToWish",authVerifyMiddleware,wishListController.saveWishList)
router.post("/removeFromWish",authVerifyMiddleware,wishListController.removeWishList)
router.get("/wishList",authVerifyMiddleware,wishListController.readWishList)
// CartList
router.post("/addToCart",authVerifyMiddleware,cartListController.addToCart)
router.post("/updateCart/:cartID",authVerifyMiddleware,cartListController.updateCart)
router.post("/removeFromCart",authVerifyMiddleware,cartListController.removeFromCart)
router.get("/cartList",authVerifyMiddleware,cartListController.readCart)

module.exports = router;