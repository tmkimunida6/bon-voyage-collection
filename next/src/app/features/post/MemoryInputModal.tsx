import {
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  Input,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import CustomIcon from '@/components/atoms/CustomIcon'
import CustomModal from '@/components/organisms/modal/CustomModal'
import useUploadImage from '@/hooks/useUploadImage'

type MemoryInputModalProps = {
  memoryImageName: string
  memoryContentName: string
}

export default function MemoryInputModal({
  memoryImageName,
  memoryContentName,
}: MemoryInputModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [memoryContent, setMemoryContent] = useState('')
  const {
    selectedImage,
    previewUrl,
    inputFileRef,
    onClickInputFile,
    handleImageChange,
    deleteInputFile,
  } = useUploadImage()

  return (
    <>
      <Button
        variant="ghost"
        fontSize="inherit"
        fontWeight="inherit"
        lineHeight="inherit"
        verticalAlign="inherit"
        textDecoration="underline"
        color="brand.link"
        p={0}
        h="auto"
        onClick={onOpen}
        gap={1}
      >
        {selectedImage || memoryContent ? (
          <CustomIcon iconName="FaCheckCircle" color="brand.link" />
        ) : (
          <CustomIcon iconName="FaPen" color="brand.link" />
        )}
        旅行の思い出を追加する
      </Button>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        modalTitle="旅行の思い出を追加する"
        buttonText="決定"
        size="md"
      >
        <Stack spacing={4}>
          <Text fontSize="sm">
            お土産を買った時の思い出を自由に追加できます。
            <br />
            投稿には表示されないので、自分だけの思い出を記録しましょう。
          </Text>
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
              >
                <Button
                  variant="ghost"
                  w="100%"
                  h="100%"
                  onClick={onClickInputFile}
                  _hover={{ opacity: 0.5 }}
                >
                  ＋画像をアップロード
                </Button>
              </VStack>
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, 800)}
              hidden
              ref={inputFileRef}
            />
          </VStack>
          <Textarea
            placeholder="旅行の思い出を自由に記入（お土産購入のきっかけやその日のエピソードなど...）"
            size="md"
            rows={4}
            value={memoryContent}
            onChange={(e) => setMemoryContent(e.target.value)}
          />
        </Stack>
      </CustomModal>
      <Input type="hidden" name={memoryContentName} value={memoryContent} />
      <Input type="hidden" name={memoryImageName} value={selectedImage} />
    </>
  )
}
