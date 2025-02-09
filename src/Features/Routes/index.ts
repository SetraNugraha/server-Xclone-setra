import express from "express"
import { PostRoutes } from "../Posts/PostRoute"
import { UserRoutes } from "../Users/UserRoute"
import { AuthRoutes } from "../Auth/AuthRoute"

const router = express.Router()
const allRoutes = [...PostRoutes, ...UserRoutes, ...AuthRoutes]

allRoutes.forEach((route) => {
  if (route.middleware) {
    router[route.method](route.url, route.middleware, route.controller)
  } else {
    router[route.method](route.url, route.controller)
  }
})

export default router
