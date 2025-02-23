/// <reference path="../types/express.d.ts" />
import fs from "fs"
import multer from "multer"
import path from "path"
import { Request } from "express"

const hasImagePath = (path: string) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }
}

const configureMulter = (folderName: string) => {
  return multer({
    storage: multer.diskStorage({
      destination: (req: Request, file: Express.Multer.File, cb) => {
        const uploadPath = path.join(process.cwd(), "public", "images", folderName)
        hasImagePath(uploadPath)
        cb(null, uploadPath)
      },

      filename: (req: Request, file: Express.Multer.File, cb) => {
        const timestamp = Date.now()
        const fileName = path.parse(file.originalname).name.toLowerCase()
        const fileExtension = path.extname(file.originalname)
        cb(null, `${fileName}-${timestamp}${fileExtension}`)
      },
    }),
    fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"]
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
      } else {
        req.fileValidationError = "Invalid file type! Only PNG, JPG, and JPEG are allowed."
        cb(null, false)
      }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit 5MB
  })
}

export const uploadProfileImage = configureMulter("UserProfile")
export const uploadPostImage = configureMulter("PostImage")
