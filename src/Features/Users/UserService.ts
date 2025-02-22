import UserRepository from "./UserRepository"
import { UserDTO } from "../../types/Users.type"
import { unlinkImage } from "../../utils/unlinkImage"

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

const updateProfileImage = async (userId: string, image: string) => {
  if (!userId) {
    throw new Error("user id are required")
  }

  // Check user exists
  const userExists = await UserRepository.getUserById(userId)

  if (!userExists) {
    throw new Error("User not found")
  }

  if (image && image !== null) {
    if (userExists.profileImage !== null) {
      unlinkImage("UserProfile", userExists.profileImage)
    }
    const result = await UserRepository.updateProfileImage(userId, image)
    return result
  } else {
    throw new Error("Please upload some image.")
  }
}

const deleteProfileImage = async (userId: string) => {
  if (!userId) {
    throw new Error("user id are required")
  }

  // Check user exists
  const userExists = await UserRepository.getUserById(userId)
  if (!userExists) {
    throw new Error("User not found")
  }

  if (userExists.profileImage !== null) {
    unlinkImage("UserProfile", userExists.profileImage)
  } else {
    throw new Error("Profile image not set yet.")
  }

  const result = await UserRepository.deleteProfileImage(userId)
  return result
}

export default {
  getAllUsers,
  getUserById,
  updateProfileImage,
  deleteProfileImage,
}
