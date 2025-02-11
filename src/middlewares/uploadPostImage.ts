import { Request } from "express"
import multer from "multer"
import path from "path"

// Storage
const storage = multer.diskStorage({
  // Destination to store image
  destination: function (req: Request, file: Express.Multer.File, cb) {
    // PATH Image Post Image
    const userProfilePath = path.join(process.cwd(), "public", "images", "PostImage")
    cb(null, userProfilePath)
  },

  // Filename
  filename: function (req: Request, file: Express.Multer.File, cb) {
    // GET DATE
    const timestamp = new Date().getTime()
    // GET only file name without extension
    const fileName = path.parse(file.originalname).name.toLowerCase()
    // GET file extension
    const fileExtension = path.extname(file.originalname)
    // result: image-date.jpg
    cb(null, `${fileName}-${timestamp}${fileExtension}`)
  },
})

// Filter file
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback): void => {
  // Allowed image type
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"]

  // Validate image type
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
    cb(new Error("Not a valid image! Please upload a PNG, JPG, or JPEG image."))
  }
}

// Inisialisasi multer
export const uploadPostImage = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit 5MB
  },
})
