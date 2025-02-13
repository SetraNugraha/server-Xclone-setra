import prisma from "../../config/database"

// Type
import { UserDTO, UserModel, UserWithToken } from "../../types/Users.type"

const getAllUsers = async (): Promise<UserDTO[]> => {
  try {
    const data = await prisma.users.findMany({
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

const getUserByToken = async (token: string): Promise<UserWithToken | null> => {
  try {
    const data = await prisma.users.findFirst({
      where: { token: token },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        profileImage: true,
        birthday: true,
        token: true,
      },
    })

    return data
  } catch (error) {
    console.error("Error fetching user by email: ", error)
    throw new Error("Error fetching user by email")
  }
}

export default {
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUserByToken,
}
