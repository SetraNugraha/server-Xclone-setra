import prisma from "../../config/database"
import { Posts } from "@prisma/client"
import { CreateNewPost } from "../../types/Posts.type"

const selectAllPosts = async () => {
  try {
    const posts = await prisma.posts.findMany()
    return posts
  } catch (error) {
    console.error("PostRepository - selectAllPost error: ", error)
    throw new Error("Failed Select All Posts")
  }
}

const selectPostByUserId = async (userId: string) => {
  try {
    const post = await prisma.posts.findMany({
      where: { userId },
    })

    return post
  } catch (error) {
    console.error("PostRepository - selectPostByUserId error: ", error)
    throw new Error("Failed Select post by user id")
  }
}

const selectPostById = async (postId: string) => {
  try {
    const postById = await prisma.posts.findUnique({
      where: { id: postId },
    })

    return postById
  } catch (error) {
    console.error("PostRepository - selectPostById error: ", error)
    throw new Error("Failed Select post by id")
  }
}

const insertNewPost = async (reqBody: CreateNewPost) => {
  try {
    const newPost = await prisma.posts.create({
      data: reqBody,
    })

    return newPost
  } catch (error) {
    console.error("PostRepository - insertPost error: ", error)
    throw new Error("Failed insert new post")
  }
}

const deletePost = async (userId: string, postId: string) => {
  try {
    const deletePost = await prisma.posts.delete({
      where: {
        id: postId,
        userId: userId,
      },
    })

    return deletePost
  } catch (error) {
    console.error("PostRepository - deletePostByUserId error: ", error)
    throw new Error("Failed delete post by user id")
  }
}

export default {
  selectAllPosts,
  selectPostByUserId,
  selectPostById,
  insertNewPost,
  deletePost,
}
