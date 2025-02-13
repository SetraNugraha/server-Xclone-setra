import {
  getAllPosts,
  getPostById,
  getPostByUserId,
  createNewPost,
  toggleLike,
  createComment,
  deletePost,
  deleteComment,
} from "./PostController"
import { verifyToken } from "../../middlewares/auth"
import { IRouting, HttpMethod } from "../../types/Routing.type"
import { uploadPostImage } from "../../middlewares/uploadImage"

export const PostRoutes: IRouting[] = [
  {
    method: HttpMethod.GET,
    url: "/posts",
    controller: getAllPosts,
  },
  {
    method: HttpMethod.GET,
    url: "/posts/:postId",
    controller: getPostById,
  },
  {
    method: HttpMethod.GET,
    url: "/posts/user/:userId",
    controller: getPostByUserId,
  },
  {
    method: HttpMethod.POST,
    url: "/posts/create",
    middleware: [verifyToken, uploadPostImage.single("postImage")],
    controller: createNewPost,
  },
  {
    method: HttpMethod.POST,
    url: "/posts/:postId/toggleLike",
    middleware: [verifyToken],
    controller: toggleLike,
  },
  {
    method: HttpMethod.POST,
    url: "/posts/:postId/comment/create",
    middleware: [verifyToken],
    controller: createComment,
  },
  {
    method: HttpMethod.DELETE,
    url: "/posts/:postId/delete",
    middleware: [verifyToken],
    controller: deletePost,
  },
  {
    method: HttpMethod.DELETE,
    url: "/posts/comment/:commentId/delete",
    middleware: [verifyToken],
    controller: deleteComment,
  },
]
