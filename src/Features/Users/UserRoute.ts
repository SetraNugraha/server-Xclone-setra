import { getAllUsers, getUserById } from "./UserController"
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
]
