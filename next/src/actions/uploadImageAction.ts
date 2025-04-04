'use server'

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadImageAction(
  fileData: string,
  folder_name: string = '',
  public_id: string = '',
) {
  const options = {
    folder: folder_name,
    public_id,
    format: 'webp',
  }
  const result = await cloudinary.uploader.upload(fileData, options)
  return result
}
