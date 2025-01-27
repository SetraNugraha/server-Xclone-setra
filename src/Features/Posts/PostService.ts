import { Posts } from "@prisma/client"
import { CreateNewPost } from "../../types/Posts.type"
import PostRepository from "./PostRepository"
import UserRepository from "../Users/UserRepository"

const getAllPosts = async () => {
  try {
    const posts = await PostRepository.selectAllPosts()

    return posts
  } catch (error) {
    console.error("Service - getAllPosts error: ", error)
  }
}

const getPostByUserId = async (userId: number) => {
  if (!userId) {
    throw new Error("user id not found or missing")
  }

  if (isNaN(userId)) {
    throw new Error("user id must be a number")
  }

  const post = await PostRepository.selectPostByUserId(userId)
  return post
}

const createNewPost = async (reqBody: CreateNewPost) => {
  const { userId, body, postImage } = reqBody

  const userExists = await UserRepository.getUserById(Number(userId))
  if (!userExists) {
    throw new Error("User not found")
  }

  if (body.trim().length === 0) {
    throw new Error("Body cannot be empty")
  }

  const bodyPost = {
    userId: userExists.id,
    body: body,
    postImage: postImage,
  }

  const newPost = await PostRepository.insertNewPost(bodyPost)

  return newPost
}

export default {
  getAllPosts,
  getPostByUserId,
  createNewPost,
}
