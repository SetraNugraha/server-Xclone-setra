import express from "express"
import prisma from "./config/database"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan"

// Routing
import Routing from "./Features/Routes/index"
import path from "path"

dotenv.config()
const app = express()
const port = process.env.PORT

// Middleware
app.use(cors({ origin: "http://localhost:5713", credentials: true }))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/images", express.static(path.join(process.cwd(), "public", "images")))
app.use(morgan("dev"))
app.use("/api", Routing)

async function startServer() {
  try {
    await prisma.$connect()
    console.log("Connected to database successfully")

    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  } catch (error) {
    console.error("Failed to connect database:", error)
    process.exit(1)
  }
}
startServer()
