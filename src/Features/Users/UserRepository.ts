import prisma from "../../config/database"
import { Users } from "@prisma/client"

// Type
import { CreateNewUser, UserDTO, UserModel } from "../../types/Users.type"

const getAllUsers = async (): Promise<Users[]> => {
  try {
    const data = await prisma.users.findMany()
    return data
  } catch (error) {
    console.error("Error fetching all user: ", error)
    throw new Error("Error fetching all users")
  }
}

const getUserById = async (userId: string): Promise<UserDTO | null> => {
  try {
    const data = await prisma.users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        profileImage: true,
        birthday: true,
      },
    })

    return data
  } catch (error) {
    console.error("Error fetching user by id: ", error)
    throw new Error("Error fetching user by id")
  }
}

// Validate Email Exists
const getUserByEmail = async (email: string): Promise<UserModel | null> => {
  try {
    const data = await prisma.users.findUnique({
      where: { email: email },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        password: true,
        profileImage: true,
        birthday: true,
      },
    })

    return data
  } catch (error) {
    console.error("Error fetching user by email: ", error)
    throw new Error("Error fetching user by email")
  }
}

const register = async (reqBody: CreateNewUser): Promise<UserDTO> => {
  try {
    const register = await prisma.users.create({
      data: reqBody,
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        profileImage: true,
        birthday: true,
      },
    })

    return register
  } catch (error) {
    console.error("Error register user: ", error)
    throw new Error("Error register users")
  }
}

const updateToken = async (userId: string, token: string) => {
  try {
    const updatedToken = await prisma.users.update({
      where: { id: userId },
      data: { token: token },
    })

    return updatedToken
  } catch (error) {
    console.error("Error update user token ", error)
    throw new Error("Error update user token")
  }
}

const deleteToken = async (userId: string) => {
  try {
    const deletedToken = await prisma.users.update({
      where: { id: userId },
      data: { token: null },
    })

    return deletedToken
  } catch (error) {
    console.error("Error delete user token ", error)
    throw new Error("Error delete user token")
  }
}

export default {
  getAllUsers,
  getUserById,
  getUserByEmail,
  register,
  updateToken,
  deleteToken
}
