const express = require("express")
const cookieParser = require("cookie-parser")
const urlRouter = require('./routes/url')
const userRoute = require('./routes/user')
const shortURlRouter = require('./routes/shortID')
const staticRoute = require('./routes/staticRouter')
const {connectMongoDB} = require("./connect")
const {restrictToLoggedinUserOnly, checkAuth} = require("./middlewares/auth")
const URL = require("./models/url")
const path = require("path")
const { handleShortURL } = require("./controllers/shortID")
const app = express()
const PORT = 8001

connectMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(() => console.log("mongodb connected"))

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())


app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.get("/test", async (req,res) => {
  const allUrls = await URL.find({})
  return res.render('home', {
    urls: allUrls
  })
})

app.use("/", checkAuth, staticRoute)
app.use("/url", restrictToLoggedinUserOnly, urlRouter)
app.use("/user", userRoute)
// app.use("/", shortURlRouter)
app.get("/:id", handleShortURL)


app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`))