import express from "express"
import UserController from "./UserController"
import { uploadUserProfile } from "../../middlewares/UploadUserProfile"

const router = express.Router()

router.get("/users", UserController.getAllUsers)
router.get("/users/:userId", UserController.getUserById)

router.post("/users/register", uploadUserProfile.single("profileImage"), UserController.register)

export default router
