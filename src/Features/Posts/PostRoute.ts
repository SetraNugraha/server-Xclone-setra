import express from "express"
import PostController from "./PostController"

const router = express.Router()

router.get("/posts", PostController.getAllPosts)
router.get("/posts/userPost", PostController.getPostByUserId)
router.post("/posts/create", PostController.createNewPost)

export default router
