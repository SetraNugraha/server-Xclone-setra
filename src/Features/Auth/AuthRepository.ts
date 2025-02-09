import prisma from "../../config/database"

// Type
import { CreateNewUser, UserDTO } from "../../types/Users.type"

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
  register,
  updateToken,
  deleteToken,
}
