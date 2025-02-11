import { getAllPosts, getPostByUserId, createNewPost, deletePost } from "./PostController"
import { verifyToken } from "../../middlewares/auth"
import { IRouting, HttpMethod } from "../../types/Routing.type"
import { uploadPostImage } from "../../middlewares/uploadPostImage"

export const PostRoutes: IRouting[] = [
  {
    method: HttpMethod.GET,
    url: "/posts",
    controller: getAllPosts,
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
    method: HttpMethod.DELETE,
    url: "/posts/delete",
    middleware: [verifyToken],
    controller: deletePost,
  },
]
