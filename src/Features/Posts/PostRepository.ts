import prisma from "../../config/database"
import { CreateNewComment, CreateNewPost } from "../../types/Posts.type"

const selectPosts = async (filter = {}) => {
  try {
    const posts = await prisma.posts.findMany({
      where: filter,
      include: {
        user: {
          select: {
            name: true,
            username: true,
            profileImage: true,
          },
        },
        comment: {
          include: {
            user: {
              select: {
                name: true,
                username: true,
                profileImage: true,
              },
            },
          },
        },
        like: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comment: true,
            like: true,
          },
        },
      },
      orderBy: { created_at: "desc" },
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
    return await prisma.$transaction(async (tx) => {
      const newPost = await tx.posts.create({
        data: reqBody,
      })

      return newPost
    })
  } catch (error) {
    console.error("PostRepository - insertPost error: ", error)
    throw new Error("Failed insert new post")
  }
}

const selectLikeByUserPostId = async (userId: string, postId: string) => {
  try {
    const like = await prisma.likes.findUnique({
      where: {
        userId_postId: {
          userId: userId,
          postId: postId,
        },
      },
    })

    return like
  } catch (error) {
    console.error("PostRepository Error - selectLikeByUserPostId: ", error)
    throw new Error("Failed select like")
  }
}

const toggleLike = async (userId: string, postId: string) => {
  try {
    return await prisma.$transaction(async (tx) => {
      const hasLike = await selectLikeByUserPostId(userId, postId)

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

const insertNewComment = async (reqBody: CreateNewComment) => {
  try {
    return await prisma.$transaction(async (tx) => {
      const newComment = await tx.comments.create({
        data: reqBody,
      })

      return newComment
    })
  } catch (error) {
    console.error("PostRepository - insertNewComment Error: ", error)
    throw new Error("Failed insert new comment")
  }
}

const deletePost = async (userId: string, postId: string) => {
  try {
    return await prisma.$transaction(async (tx) => {
      const deletePost = await tx.posts.delete({
        where: {
          id: postId,
          userId: userId,
        },
      })

      return deletePost
    })
  } catch (error) {
    console.error("PostRepository - deletePostByUserId error: ", error)
    throw new Error("Failed delete post by user id")
  }
}

const selectCommentById = async (commentId: string) => {
  try {
    const commentById = await prisma.comments.findUnique({
      where: { id: commentId },
    })

    return commentById
  } catch (error) {
    console.error("PostRepository - selectCommentById Error: ", error)
    throw new Error("Failed select comment by id")
  }
}

const deleteComment = async (commentId: string) => {
  try {
    return await prisma.$transaction(async (tx) => {
      const deletedComment = await tx.comments.delete({
        where: { id: commentId },
      })

      return deletedComment
    })
  } catch (error) {
    console.error("PostRepository - deleteComment Error: ", error)
    throw new Error("Failed delete comment")
  }
}

export default {
  selectAllPosts,
  selectPostByUserId,
  selectPostById,
  selectCommentById,
  insertNewPost,
  toggleLike,
  insertNewComment,
  deletePost,
  deleteComment,
}
