import { getAllPosts, getPostByUserId, createNewPost, deletePost } from "./PostController"
import { IRouting, HttpMethod } from "../../types/Routing.type"

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
    controller: createNewPost,
  },
  {
    method: HttpMethod.DELETE,
    url: "/posts/delete/:userId",
    controller: deletePost,
  },
]
