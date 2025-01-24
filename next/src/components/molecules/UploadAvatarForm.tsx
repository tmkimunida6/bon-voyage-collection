'use client'

import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import CustomIcon from '../atoms/CustomIcon'
import useUploadImage from '@/hooks/useUploadImage'

type UploadAvatarFormProps = {
  name: string
  errors: Array<string> | undefined
  isRequired: boolean
  prevImage: string
  imageChanged: boolean
  setImageChanged: Dispatch<SetStateAction<boolean>>
}

const UploadAvatarForm = ({
  name,
  errors,
  isRequired,
  prevImage,
  imageChanged,
  setImageChanged,
}: UploadAvatarFormProps) => {
  const {
    selectedImage,
    previewUrl,
    inputFileRef,
    onClickInputFile,
    handleImageChange,
    deleteInputFile,
  } = useUploadImage()

  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    // 画像変更開始フラグ
    if (!imageChanged) {
      setImageChanged(true)
    }
    handleImageChange(e, 192)
  }

  return (
    <VStack spacing={0}>
      <FormControl isRequired={isRequired}>
        <FormLabel>プロフィール画像</FormLabel>
        <Box position="relative" display="inline-block">
          {!prevImage && !previewUrl ? (
            <Avatar size="xl" bg="gray.400" />
          ) : (
            <Avatar size="xl" src={previewUrl || prevImage} />
          )}
          <Flex
            bg="brand.primary"
            borderRadius="50%"
            p={1}
            position="absolute"
            bottom={0}
            right={0}
            alignItems="center"
            justifyContent="center"
            w="24px"
            h="24px"
          >
            <Button
              variant="ghost"
              p={0}
              _hover={{ opacity: 0.5 }}
              onClick={onClickInputFile}
            >
              <CustomIcon iconName="FaPen" color="white" fontSize="xs" />
            </Button>
          </Flex>
        </Box>
        {previewUrl && (
          <Button
            variant="ghost"
            fontSize="sm"
            color="brand.link"
            p={0}
            h="auto"
            display="flex"
            alignItems="center"
            gap="2px"
            mt={4}
            textDecoration="underline"
            _hover={{ textDecoration: 'none' }}
            onClick={deleteInputFile}
          >
            <CustomIcon iconName="FaUndoAlt" />
            元の画像に戻す
          </Button>
        )}
      </FormControl>
      <Input
        type="file"
        accept="image/*"
        onChange={onChangeImage}
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

export default UploadAvatarForm
