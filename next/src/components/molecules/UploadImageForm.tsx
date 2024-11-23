/* eslint @typescript-eslint/no-unused-vars: 0 */

'use client'

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  IconButton,
  Image,
  Input,
  useToast,
  VStack,
} from '@chakra-ui/react'
import imageCompression from 'browser-image-compression'
import { ChangeEvent, useRef, useState } from 'react'
import CustomIcon from '../atoms/CustomIcon'

type UploadImageFormProps = {
  name: string
  errors: Array<string> | undefined
  isRequired: boolean
}

const UploadImageForm = ({
  name,
  errors,
  isRequired,
}: UploadImageFormProps) => {
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

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        // 画像を圧縮
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 800,
          useWebWorker: true,
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

  return (
    <VStack spacing={0}>
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
          bg="gray.200"
          w="100%"
          h="128px"
          borderRadius={4}
          justifyContent="center"
          border={errors && '2px solid var(--chakra-colors-red-500)'}
          boxShadow={errors && '0 0 0 1px var(--chakra-colors-red-500)'}
        >
          <Button
            variant="ghost"
            w="100%"
            h="100%"
            onClick={onClickInputFile}
            _hover={{ opacity: 0.5 }}
          >
            ＋画像をアップロード{isRequired && '（必須）'}
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
      <FormControl isInvalid={!!errors}>
        <Input type="hidden" name={name} value={selectedImage} />
        <FormErrorMessage>{errors}</FormErrorMessage>
      </FormControl>
    </VStack>
  )
}

export default UploadImageForm
