import { Request, Response } from "express"
import PostService from "./PostService"

const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await PostService.getAllPosts()

    if (!data || data?.length === 0) {
      res.status(404).json({
        success: true,
        message: "Posts Not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Get all posts success",
      data: data,
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      })

      return
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

const getPostByUserId = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId)

    const post = await PostService.getPostByUserId(userId)

    res.status(200).json({
      success: true,
      message: "get post by user id success",
      data: post,
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      })

      return
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

const createNewPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, body } = req.body
    const image = req.file ? req.file.filename : null

    const bodyPost = {
      userId: userId,
      body: body,
      postImage: image,
    }
    const newPost = await PostService.createNewPost(bodyPost)

    res.status(201).json({
      success: true,
      message: "Post created",
      data: newPost,
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      })

      return
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

export default {
  getAllPosts,
  getPostByUserId,
  createNewPost,
}
