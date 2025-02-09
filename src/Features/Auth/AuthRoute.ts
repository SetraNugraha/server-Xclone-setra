import { IRouting, HttpMethod } from "../../types/Routing.type"
import { register, login, refreshToken, logout } from "./AuthController"

export const AuthRoutes: IRouting[] = [
  {
    method: HttpMethod.POST,
    url: "/auth/register",
    controller: register,
  },
  {
    method: HttpMethod.POST,
    url: "/auth/login",
    controller: login,
  },
  {
    method: HttpMethod.GET,
    url: "/auth/refreshToken",
    controller: refreshToken,
  },
  {
    method: HttpMethod.DELETE,
    url: "/auth/logout/:userId",
    controller: logout,
  },
]
