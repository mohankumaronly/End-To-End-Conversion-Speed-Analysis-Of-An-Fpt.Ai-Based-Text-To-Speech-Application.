import express from "express"
import 'dotenv/config'
import connectDB from "./DatabaseConnection/db.js"
import userRoute from "./routes/userRoute.js"
import cors from 'cors'
import path from "path";

const app = express()

const PORT = process.env.PORT || 3000

// JSON body for normal routes
app.use(express.json())

// TEXT body for TTS route
app.use(express.text({ type: "text/*" }))

app.use(cors())

// Serve audio files
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")))

// User routes including TTS
app.use('/user', userRoute)

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is listening at port ${PORT}`);
})
