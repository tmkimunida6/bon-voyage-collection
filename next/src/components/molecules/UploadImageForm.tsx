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
  VStack,
} from '@chakra-ui/react'
import CustomIcon from '../atoms/CustomIcon'
import useUploadImage from '@/hooks/useUploadImage'

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
  const {
    selectedImage,
    previewUrl,
    inputFileRef,
    onClickInputFile,
    handleImageChange,
    deleteInputFile,
  } = useUploadImage()

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
