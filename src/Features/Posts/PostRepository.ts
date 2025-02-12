import prisma from "../../config/database"
import { CreateNewPost } from "../../types/Posts.type"

const selectPosts = async (filter = {}) => {
  try {
    const posts = await prisma.posts.findMany({
      where: filter,
      include: {
        comment: true,
        _count: {
          select: {
            comment: true,
            like: true,
          },
        },
      },
    })

    return posts
  } catch (error) {
    console.error("PostRepository Error - selectPosts: ", error)
    throw new Error("Failed select posts")
  }
}

const selectAllPosts = async () => selectPosts()
const selectPostById = async (postId: string) => selectPosts({ id: postId })
const selectPostByUserId = async (userId: string) => selectPosts({ userId: userId })

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

const toggleLike = async (userId: string, postId: string) => {
  try {
    return await prisma.$transaction(async (tx) => {
      const hasLike = await tx.likes.findUnique({
        where: {
          userId_postId: {
            userId: userId,
            postId: postId,
          },
        },
      })

      if (hasLike) {
        await tx.likes.delete({
          where: {
            userId_postId: {
              userId: userId,
              postId: postId,
            },
          },
        })
      } else {
        await tx.likes.create({
          data: {
            userId: userId,
            postId: postId,
          },
        })
      }

      return { liked: !hasLike }
    })
  } catch (error) {
    console.error("PostRepository Error - toggleLike: ", error)
    throw new Error("Failed toggleLike")
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
  toggleLike,
  deletePost,
}
