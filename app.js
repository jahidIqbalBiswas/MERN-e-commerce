// Basic library import
const express = require("express")
const cors = require("cors")
const rateLimit = require("express-rate-limit")
const hpp = require("hpp")
const helmet = require("helmet")
const path = require("path")
const cookieParser = require('cookie-parser');
const router = require("./src/routes/api")
const mongoose = require("mongoose")
const mongoSanitize = require("express-mongo-sanitize")
const app = express()
// Middlewares implement
app.use(cookieParser());
// Cross Origin enable
app.use(cors())
// Security implementation
app.use(helmet())
app.use(hpp())
app.use(mongoSanitize());
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({extended:true}))
const limiter = rateLimit({
    windowMs: (15 * 60) * 1000,
    max: 500
})
app.use(limiter)
// Database connection
const URL = "mongodb+srv://<username>:<password>@cluster0.cgs1psp.mongodb.net/e-commerce"
const OPTIONS = {user:"jahidbiswas",pass:"jahidbiswas",autoIndex:true}
mongoose.connect(URL,OPTIONS)
    .then(() => console.log("MongoDB Connected!"))
    .catch(err => console.log(err))
// Cache disable
app.set("etag",false)
// backend router
app.use('/api',router)
// Connect React dist folder
app.use(express.static("client/dist"))
// Add React front-end routing
app.get("*", (req,res) => {
    res.sendFile(path.resolve(__dirname,"client","dist","index.html"))
})
module.exports = app
