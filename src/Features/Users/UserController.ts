import UserService from "./UserService"
import { Request, Response } from "express"

// Type
import { Users } from "@prisma/client"
import { CreateNewUser } from "../../types/Users.type"

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: Users[] = await UserService.getAllUsers()

    res.status(200).json({
      success: true,
      message: "Get all users success",
      data: data.length > 0 ? data : "Users not found",
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      })
      return
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: number = parseInt(req.params.userId, 10)

    const data = await UserService.getUserById(userId)

    res.status(200).json({
      success: true,
      message: "Success get user by id",
      data: data,
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      })

      return
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body
    const profileImage = req.file ? req.file.filename : null

    // Create Username
    const username: string = name.trim().toLowerCase() + new Date().getTime().toString().slice(-5)

    // Prepare Data
    const registerData: CreateNewUser = {
      name: name.trim(),
      username: String(username),
      email: email.trim(),
      password: password.trim(),
      profileImage: profileImage,
    }

    const register = await UserService.register(registerData)

    res.status(201).json({
      success: true,
      message: "Register success",
      data: register,
    })
  } catch (error) {
    if (error && typeof error === "object" && "path" in error && "message" in error) {
      res.status(400).json({
        success: false,
        path: error.path,
        message: error.message,
      })

      return
    }

    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      })

      return
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

export default {
  getAllUsers,
  getUserById,
  register,
}
