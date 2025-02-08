import { getAllUsers, getUserById, register, login, logout } from "./UserController"
import { uploadUserProfile } from "../../middlewares/UploadUserProfile"
import { IRouting, HttpMethod } from "../../types/Routing.type"

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
    method: HttpMethod.POST,
    url: "/users/register",
    controller: register,
  },
  {
    method: HttpMethod.POST,
    url: "/users/login",
    controller: login,
  },
  {
    method: HttpMethod.DELETE,
    url: "/users/logout/:userId",
    controller: logout,
  },
]
