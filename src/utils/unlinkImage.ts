import path from "path"
import fs from "fs"

export const unlinkImage = (imageFolder: string, imageName: string) => {
  const imagePath = path.join(process.cwd(), "public", "images", imageFolder, imageName)
  fs.unlink(imagePath, (err) => {
    if (err) throw err
    console.log(`${imageName} was deleted`)
  })
}
