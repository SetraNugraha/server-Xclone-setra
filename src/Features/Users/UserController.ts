/// <reference path="../../types/express.d.ts" />
import UserService from "./UserService"
import { Request, Response } from "express"
import { UserDTO } from "../../types/Users.type"

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: UserDTO[] = await UserService.getAllUsers()

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

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId

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

export const updateProfileImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId || ""
    const image = req.file?.filename || ""

    await UserService.updateProfileImage(userId, image)

    res.status(200).json({
      success: true,
      message: "Update profile success",
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

export const deleteProfileImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId ?? ""
    await UserService.deleteProfileImage(userId)

    res.status(200).json({
      success: true,
      message: "Delete profile image success",
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
