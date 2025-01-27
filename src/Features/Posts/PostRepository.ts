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

const selectPostByUserId = async (userId: number) => {
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

export default {
  selectAllPosts,
  selectPostByUserId,
  insertNewPost,
}
