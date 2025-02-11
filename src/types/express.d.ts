import { JwtPayload } from "jsonwebtoken"
import { Request } from "express"

// For req.user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & {
        userId: string
        name: string
        username: string
        email: string
        profileImage: string
        birthday: string
        exp?: number
      }
      file?: Express.Multer.File
    }
  }
}
export {}
