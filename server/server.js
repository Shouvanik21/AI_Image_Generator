const express=require("express")
const cors=require("cors")
const dotenv=require("dotenv")
const cookieParser=require("cookie-parser")
const connectDB=require("./config/db")
const imageRoutes=require("./routes/imageRoutes")
dotenv.config()

const app=express()
app.use(cors())
app.use(express.json())

connectDB()

app.use(cookieParser())
app.use("/api/auth",imageRoutes)

app.get("/",(req,res)=>{
    res.send("AI Image Studio Backend Running...")
})

const PORT=process.env.PORT || 5000

app.listen(PORT ,()=>{
    console.log(`Server running on port ${PORT}`)
})