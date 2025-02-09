import UserRepository from "./UserRepository"
import { UserDTO } from "../../types/Users.type"

const getAllUsers = async (): Promise<UserDTO[]> => {
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

export default {
  getAllUsers,
  getUserById,
}
