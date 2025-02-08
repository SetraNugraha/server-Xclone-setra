import UserRepository from "./UserRepository"
import bcryptjs from "bcryptjs"
import { validateInput } from "../../utils/validateError"
import jwt from "jsonwebtoken"

// Type
import { Users } from "@prisma/client"
import { CreateNewUser, UserDTO } from "../../types/Users.type"

const getAllUsers = async (): Promise<Users[]> => {
  const data = await UserRepository.getAllUsers()
  return data
}

const getUserById = async (userId: string): Promise<UserDTO | null> => {
  if (!userId) {
    throw new Error("params user id are required")
  }

  const data = await UserRepository.getUserById(userId)

  if (!data || data === null) {
    throw new Error("user not found")
  }

  return data
}

const register = async (reqBody: CreateNewUser): Promise<UserDTO> => {
  const { name, email, password, profileImage, birthday } = reqBody

  if (!name || !email || !password || !birthday) {
    throw new Error("All fields are required")
  }

  // Check Email Exists
  const checkEmailExists = await UserRepository.getUserByEmail(email)
  validateInput(checkEmailExists !== null, "email", "Email already exists")

  // Create Unique Username from name + last 5 letters timestamp
  const username: string = name.trim().toLowerCase().replace(/\s+/g, "") + new Date().getTime().toString().slice(-5)

  // Hash Password
  const salt = await bcryptjs.genSalt(10)
  const hashedPassword: string = await bcryptjs.hash(password, salt)

  // Prepare Data
  const registerData = {
    name: name.trim(),
    username: String(username),
    email: email.trim().toLowerCase(),
    password: hashedPassword,
    profileImage: profileImage,
    birthday: birthday,
  }

  const register = await UserRepository.register(registerData)
  return register
}

const login = async (reqBody: { email: string; password: string }) => {
  const { email, password } = reqBody

  // find userExists by email
  const userExists = await UserRepository.getUserByEmail(email)
  if (!userExists) {
    throw new Error("User not found")
  }

  // match password userExists
  const matchPassword = await bcryptjs.compare(password, userExists.password)
  validateInput(!matchPassword, "password", "Password incorrect")

  // get data userExists
  const { id, name, username, email: userEmail, birthday } = userExists

  // set payload
  const payload = { id, name, username, userEmail, birthday }

  // Handle TOKEN
  const accessTokenSecret = process.env.ACCESS_TOKEN
  const refreshTokenSecret = process.env.REFRESH_TOKEN
  if (!accessTokenSecret && !refreshTokenSecret) {
    throw new Error("Missing secret token")
  }

  // sign access token with jwt sign, seet expire 20 min
  // @ts-ignore
  const accessToken = jwt.sign(payload, accessTokenSecret, {
    expiresIn: "20m",
  })

  // sign refresh token with jwt sign, set expire 20 min
  // @ts-ignore
  const refreshToken = jwt.sign(payload, refreshTokenSecret, {
    expiresIn: "1d",
  })

  // update token on table users, with resfresh token
  await UserRepository.updateToken(id, refreshToken)

  return { accessToken, refreshToken }
}

const logout = async (userId: string) => {
  if (!userId) {
    throw new Error("user id not found")
  }

  const userExists = await UserRepository.getUserById(userId)
  if (!userExists) {
    throw new Error("User not found")
  }

  const deleteToken = await UserRepository.deleteToken(userExists.id)

  return deleteToken
}

export default {
  getAllUsers,
  getUserById,
  register,
  login,
  logout,
}
