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

const getPostByUserId = async (userId: string) => {
  if (!userId) {
    throw new Error("user id not found or missing")
  }

  const userExists = await UserRepository.getUserById(userId)
  if (!userExists) {
    throw new Error("User not found")
  }

  const post = await PostRepository.selectPostByUserId(userExists.id)
  return post
}

const createNewPost = async (reqBody: CreateNewPost) => {
  const { userId, body, postImage } = reqBody

  const userExists = await UserRepository.getUserById(userId)
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

const deletePost = async (userId: string, postId: string) => {
  if (!userId && !postId) {
    throw new Error("user id & post id are required")
  }

  // Check user exists
  const userExists = await UserRepository.getUserById(userId)
  if (!userExists) {
    throw new Error("User not found")
  }

  // Check post exists
  const postExists = await PostRepository.selectPostById(postId)
  if (!postExists) {
    throw new Error("Post not found")
  }

  return PostRepository.deletePost(userExists.id, postExists.id)
}

export default {
  getAllPosts,
  getPostByUserId,
  createNewPost,
  deletePost,
}
