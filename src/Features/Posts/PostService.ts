import { CreateNewPost } from "../../types/Posts.type"
import PostRepository from "./PostRepository"
import UserRepository from "../Users/UserRepository"
import { unlinkImage } from "../../utils/unlinkImage"

const getAllPosts = async () => {
  try {
    const posts = await PostRepository.selectAllPosts()

    return posts
  } catch (error) {
    console.error("Service - getAllPosts error: ", error)
  }
}

const getPostByPostId = async (postId: string) => {
  if (!postId) {
    throw new Error("post id not found or missing")
  }

  const postById = await PostRepository.selectPostById(postId)

  if (!postById || postById.length === 0) {
    throw new Error("Post not found")
  }

  return postById
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

const toggleLike = async (userId: string, postId: string) => {
  if (!userId || !postId) {
    throw new Error("userId and postId are required")
  }

  // Check user exists
  const userExists = await UserRepository.getUserById(userId)
  if (!userExists) {
    throw new Error("user not found or not logged in")
  }

  // Check Post Exists
  const postExists = await PostRepository.selectPostById(postId)
  if (!postExists || postExists.length === 0) {
    throw new Error("Post not found")
  }

  const toggleLike = await PostRepository.toggleLike(userExists.id, postExists[0].id)

  return toggleLike
}

const deletePost = async (userId: string, postId: string) => {
  if (!userId || !postId) {
    throw new Error("user id & post id are required")
  }

  // Check user exists
  const userExists = await UserRepository.getUserById(userId)
  if (!userExists) {
    throw new Error("User not found")
  }

  // Check post exists
  const postExists = await PostRepository.selectPostById(postId)
  if (!postExists || postExists.length === 0 || postExists[0].userId !== userExists.id) {
    throw new Error("Post not found")
  }

  // Unlink file image
  if (postExists[0].postImage) {
    unlinkImage("PostImage", postExists[0].postImage)
  }

  return PostRepository.deletePost(userExists.id, postExists[0].id)
}

export default {
  getAllPosts,
  getPostByPostId,
  getPostByUserId,
  createNewPost,
  toggleLike,
  deletePost,
}
