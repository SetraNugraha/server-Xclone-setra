/// <reference path="../../types/express.d.ts" />
import { Request, Response } from "express"
import PostService from "./PostService"

export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await PostService.getAllPosts()

    if (!data || data?.length === 0) {
      res.status(404).json({
        success: true,
        message: "Posts Not found",
      })

      return
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

    return
  }
}

export const getPostByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId

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

    return
  }
}

export const createNewPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId ?? ""
    const body = req.body.body
    const image = req.file ? req.file.filename : null

    const bodyPost = {
      userId: userId ?? "",
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

    return
  }
}

export const deletePost = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId ?? ""
    const postId = String(req.query.postId)

    await PostService.deletePost(userId, postId)

    res.status(200).json({
      success: true,
      message: "Successfuly deleted post",
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

    return
  }
}
