import AuthRepository from "./AuthRepository"
import UserRepository from "../Users/UserRepository"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { validateInput } from "../../utils/validateError"
import { CreateNewUser, UserDTO } from "../../types/Users.type"

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

  const register = await AuthRepository.register(registerData)
  return register
}

const login = async (reqBody: { email: string; password: string }) => {
  try {
    const { email, password } = reqBody

    // Regex Email Format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    validateInput(!emailRegex.test(email), "email", "Invalid format email")
    validateInput(password.length < 6, "password", "Password must be greater than 6 characters")

    // find userExists by email
    const userExists = await UserRepository.getUserByEmail(email)
    validateInput(!userExists, "email", "Email not registered yet")

    // match password userExists
    const matchPassword = await bcryptjs.compare(password, userExists!.password)
    validateInput(!matchPassword, "password", "Password incorrect")

    // get data userExists
    const { id: userId, name, username, email: userEmail, birthday } = userExists!

    // set payload
    const payload = { userId, name, username, userEmail, birthday }

    // sign access token with jwt sign, set expire 20 min
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN as string, {
      expiresIn: "20m",
    })

    // sign refresh token with jwt sign, set expire 1 Day
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN as string, {
      expiresIn: "1d",
    })

    // update token on table users, with resfresh token
    await AuthRepository.updateToken(userId, refreshToken)

    return { accessToken, refreshToken }
  } catch (error) {
    console.error("AuthService - login Error: ", error)
    throw error
  }
}

const refreshToken = async (token: string) => {
  try {
    // Check token from cookies
    if (!token || token === "") {
      throw new Error("Unauthorized, token not provided")
    }

    // Find user with token
    const userExists = await UserRepository.getUserByToken(token)
    if (!userExists) {
      throw new Error("Access denied, invalid or expired token")
    }

    // Compare token from cookies with refresh token on env
    // @ts-ignore
    jwt.verify(token, process.env.REFRESH_TOKEN, (err, decode) => {
      if (err) {
        throw new Error("Access denied, invalid or expired token")
      }
    })

    // get data user
    const { id: userId, name, username, email: userEmail, profileImage, birthday } = userExists

    // set payload
    const payload = {
      userId,
      name,
      username,
      profileImage,
      userEmail,
      birthday,
    }

    // Set access token with jwt wign
    // @ts-ignore
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN as string, {
      expiresIn: "1d",
    })

    return accessToken
  } catch (error) {
    console.error("AuthService - refreshToken Error: ", error)
    throw error
  }
}

const logout = async (userId: string) => {
  if (!userId) {
    throw new Error("user id not found")
  }

  const userExists = await UserRepository.getUserById(userId)
  if (!userExists) {
    throw new Error("User not found")
  }

  const deleteToken = await AuthRepository.deleteToken(userExists.id)

  return deleteToken
}

export default {
  register,
  login,
  refreshToken,
  logout,
}
