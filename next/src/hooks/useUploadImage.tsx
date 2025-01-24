/* eslint @typescript-eslint/no-unused-vars: 0 */

import { useToast } from '@chakra-ui/react'
import imageCompression from 'browser-image-compression'
import { ChangeEvent, useRef, useState } from 'react'

const useUploadImage = () => {
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const inputFileRef = useRef<HTMLInputElement>(null)
  const toast = useToast()

  const onClickInputFile = () => {
    const inputFileElement = inputFileRef.current
    inputFileElement?.click()
  }

  function fileToBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
      reader.readAsDataURL(file)
    })
  }

  const handleImageChange = async (
    event: ChangeEvent<HTMLInputElement>,
    size: number,
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        // 画像を圧縮
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: size,
          useWebWorker: true,
          fileType: 'image/webp',
        }
        const compressedFile = await imageCompression(file, options)

        // 圧縮した画像をBase64に変換
        const encodedImage = (await fileToBase64(compressedFile)) as string
        setSelectedImage(encodedImage)

        // プレビュー画像をセット
        const previewUrl = URL.createObjectURL(compressedFile)
        setPreviewUrl(previewUrl)
      } catch (error) {
        toast({
          title:
            'サーバーエラーが発生しました。時間をおいてから再度お試しください。',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
        setSelectedImage('')
        setPreviewUrl(null)
      }
    }
  }

  const deleteInputFile = () => {
    setSelectedImage('')
    setPreviewUrl(null)
  }

  return {
    selectedImage,
    previewUrl,
    inputFileRef,
    onClickInputFile,
    handleImageChange,
    deleteInputFile,
  }
}

export default useUploadImage
