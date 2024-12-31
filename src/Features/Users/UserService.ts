import UserRepository from "./UserRepository"
import bcryptjs from "bcryptjs"
import { validateInput } from "../../utils/validateError"

// Type
import { Users } from "@prisma/client"
import { CreateNewUser } from "../../types/Users.type"

const getAllUsers = async (): Promise<Users[]> => {
  const data = await UserRepository.getAllUsers()
  return data
}

const getUserById = async (userId: number): Promise<Users | null> => {
  if (isNaN(userId) || userId < 0) {
    throw new Error("Invalid user id format")
  }

  const data = await UserRepository.getUserById(userId)

  if (!data || data === null) {
    throw new Error("user not found")
  }

  return data
}

const register = async (reqBody: CreateNewUser): Promise<Users> => {
  const { name, username, email, password, profileImage } = reqBody
  // Regex Email Format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  // Hash Password
  const salt = await bcryptjs.genSalt(10)
  const hashedPassword: string = await bcryptjs.hash(password, salt)

  if (!name || !email || !password) {
    throw new Error("All fields are required")
  }
  // Check Email Exists
  const checkEmailExists: boolean = await UserRepository.isEmailExists(email)

  validateInput(!emailRegex.test(email), "email", "Invalid format email")
  validateInput(checkEmailExists, "email", "Email already exists")
  validateInput(password.length < 6, "password", "Password must be greater than 6 characters")

  // Prepare Data
  const registerData: CreateNewUser = {
    name: name.trim(),
    username: username,
    email: email,
    password: hashedPassword,
    profileImage: profileImage,
  }

  const register = await UserRepository.register(registerData)
  return register
}

export default {
  getAllUsers,
  getUserById,
  register,
}
