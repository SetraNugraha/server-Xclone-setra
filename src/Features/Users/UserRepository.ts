import prisma from "../../config/database"
import { Users } from "@prisma/client"

// Type
import { CreateNewUser } from "../../types/Users.type"

const getAllUsers = async (): Promise<Users[]> => {
  try {
    const data = await prisma.users.findMany()
    return data
  } catch (error) {
    console.error("Error fetching all user: ", error)
    throw new Error("Error fetching all users")
  }
}

const getUserById = async (userId: number): Promise<Users | null> => {
  try {
    const data = await prisma.users.findUnique({
      where: { id: userId },
    })

    return data
  } catch (error) {
    console.error("Error fetching user by id: ", error)
    throw new Error("Error fetching user by id")
  }
}

// Validate Email Exists
const isEmailExists = async (email: string): Promise<boolean> => {
  const data = await prisma.users.findUnique({
    where: { email: email },
  })

  if (data || data !== null) {
    return true
  }

  return false
}

const register = async (reqBody: CreateNewUser): Promise<Users> => {
  try {
    const register = await prisma.users.create({
      data: reqBody,
    })

    return register
  } catch (error) {
    console.error("Error register user: ", error)
    throw new Error("Error register users")
  }
}

export default {
  getAllUsers,
  getUserById,
  register,
  isEmailExists,
}
