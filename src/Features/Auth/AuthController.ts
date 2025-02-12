/// <reference path="../../types/express.d.ts" />
import { Request, Response } from "express"
import AuthService from "./AuthService"
import { validateInput } from "../../utils/validateError"

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, confirmPassword, birthday } = req.body
    const profileImage = req.file ? req.file.filename : null
    // Regex Email Format
    const emailRegex = /^(?!.*\.{2})[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    validateInput(!emailRegex.test(email), "email", "Invalid format email")
    validateInput(password.length < 6, "password", "Password must be greater than 6 characters")
    validateInput(password !== confirmPassword, "password", "Password do not match")

    // Prepare Data
    const registerData = {
      name: name,
      username: name,
      email: email.toLowerCase(),
      password: password,
      profileImage: profileImage,
      birthday: birthday,
    }

    const register = await AuthService.register(registerData)

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

    return
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const email = req.body.email.trim().toLowerCase()
    const password = req.body.password

    // Regex Email Format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    validateInput(!emailRegex.test(email), "email", "Invalid format email")
    validateInput(password.length < 6, "password", "Password must be greater than 6 characters")

    const { accessToken, refreshToken } = await AuthService.login({ email, password })

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // Hour * minute * second * mili scond = 1 day
    })

    res.status(200).json({
      success: true,
      message: "login success",
      accessToken,
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

    return
  }
}

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken
    const accessToken = await AuthService.refreshToken(token)

    res.status(200).json({
      success: true,
      message: "get refreshToken success",
      accessToken,
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

    return
  }
}

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId
    await AuthService.logout(userId)
    res.sendStatus(200)
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

    return
  }
}
