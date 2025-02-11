import { Request, Response, NextFunction } from "express"
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken"

// For req.user
// declare global {
//   namespace Express {
//     interface Request {
//       user?: JwtPayload & {
//         userId: string
//         name: string
//         username: string
//         email: string
//         profileImage: string
//         birthday: string
//         exp?: number
//       }
//     }
//   }
// }

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // Get Token from headers
  const token = req.headers.authorization?.split(" ")[1]

  // Check Token
  if (!token || token === "") {
    return res.status(403).json({
      success: false,
      message: "Unauthorized, token not provided",
    })
  }

  // Verify Token from headers with access token env use jwt verify and store decode result to variable user
  try {
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN as string) as JwtPayload
    req.user = {
      userId: decode.userId,
      name: decode.name,
      username: decode.username,
      email: decode.userEmail,
      profileImage: decode.profileImage,
      birthday: decode.birthday,
      exp: decode.exp,
    }

    next()
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return res.status(403).json({
        success: false,
        message: "Access denied, invalid or expired token",
      })
    }

    return res.status(500).json({
      success: false,
      message: "Middleware verifyToken error",
    })
  }
}
