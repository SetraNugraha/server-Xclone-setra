import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

// Routes
import UserRoute from "./Features/Users/UserRoute"
import PostRoute from "./Features/Posts/PostRoute"

dotenv.config()
const app = express()
const router = express.Router()

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(cookieParser())
app.use(express.json())
app.use("/api", router)
router.use(UserRoute, PostRoute)

const port = 3000
app.listen(port, () => {
  console.log(`Server running in port: ${port}`)
})
