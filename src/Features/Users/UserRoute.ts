import { getAllUsers, getUserById, updateProfileimage, deleteProfileImage } from "./UserController"
import { IRouting, HttpMethod } from "../../types/Routing.type"
import { uploadProfileImage } from "../../middlewares/uploadImage"
import { verifyToken } from "../../middlewares/auth"

export const UserRoutes: IRouting[] = [
  {
    method: HttpMethod.GET,
    url: "/users",
    controller: getAllUsers,
  },
  {
    method: HttpMethod.GET,
    url: "/users/:userId",
    controller: getUserById,
  },
  {
    method: HttpMethod.PUT,
    url: "/users/profileImage/update",
    middleware: [verifyToken, uploadProfileImage.single("profileImage")],
    controller: updateProfileimage,
  },
  {
    method: HttpMethod.PUT,
    url: "/users/profileImage/delete",
    middleware: [verifyToken],
    controller: deleteProfileImage,
  },
]
