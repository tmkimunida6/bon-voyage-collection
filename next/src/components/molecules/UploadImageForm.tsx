'use client'

import {
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  Input,
  VStack,
} from '@chakra-ui/react'
import { ChangeEvent, useRef, useState } from 'react'
import CustomIcon from '../atoms/CustomIcon'

const UploadImageForm = () => {
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const inputFileRef = useRef<HTMLInputElement>(null)

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

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const encodedImage = (await fileToBase64(file)) as string
      setSelectedImage(encodedImage)

      // プレビュー画像をセット
      const previewUrl = URL.createObjectURL(file)
      setPreviewUrl(previewUrl)
    }
  }

  const deleteInputFile = () => {
    setSelectedImage('')
    setPreviewUrl(null)
  }

  return (
    <VStack>
      {previewUrl ? (
        <Box position="relative" display="inline-flex">
          <Image src={previewUrl} alt="プレビュー画像" maxH="300px" />
          <HStack position="absolute" bottom={2} right={2}>
            <IconButton
              colorScheme="yellow"
              color="white"
              aria-label="変更する"
              icon={<CustomIcon iconName="FaPen" />}
              size="xs"
              onClick={onClickInputFile}
            />
            <IconButton
              colorScheme="red"
              aria-label="削除する"
              icon={<CustomIcon iconName="FaTrashAlt" />}
              size="xs"
              onClick={deleteInputFile}
            />
          </HStack>
        </Box>
      ) : (
        <VStack
          bg="brand.gray"
          w="100%"
          h="128px"
          borderRadius={4}
          justifyContent="center"
        >
          <Button
            variant="ghost"
            color="white"
            w="100%"
            h="100%"
            onClick={onClickInputFile}
          >
            ＋画像をアップロード
          </Button>
        </VStack>
      )}
      <Input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        hidden
        ref={inputFileRef}
      />
      <Input type="hidden" name="image" value={selectedImage} />
    </VStack>
  )
}

export default UploadImageForm
