'use client'

import {
  Box,
  IconButton,
  Image,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'
import CustomIcon from '@/components/atoms/CustomIcon'
import SouvenirCard from '@/components/organisms/Souvenir/SouvenirCard'
import CustomModal from '@/components/organisms/modal/CustomModal'
import { PostType } from '@/types/types'

type MySouvenirCardWithMemoryModalProps = {
  post: PostType
}

export default function MySouvenirCardWithMemoryModal({
  post,
}: MySouvenirCardWithMemoryModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const handleOpenModal = () => {
    if (!post.memory_image_url && !post.memory_content) {
      toast({
        title: '旅行の思い出は記録されていません。',
        status: 'info',
        duration: 5000,
        isClosable: true,
      })
      return
    }
    onOpen()
  }
  return (
    <>
      <Box position="relative">
        <SouvenirCard
          key={post.alias_id}
          size="md"
          souvenir={post.souvenir}
          isFavoritable={false}
          rating={post.rating}
          img={post.image_url || post.souvenir.image_url}
        />
        {(post.memory_image_url || post.memory_content) && (
          <>
            <IconButton
              aria-label="旅行の思い出を見る"
              icon={<CustomIcon iconName="FaSearchPlus" />}
              position="absolute"
              top={2}
              right={2}
              height={6}
              minWidth={6}
              colorScheme="blue"
              onClick={handleOpenModal}
            />
            <CustomModal
              isOpen={isOpen}
              onClose={onClose}
              modalTitle="旅行の思い出"
              buttonText=""
              size="sm"
            >
              <VStack>
                {post.memory_image_url && (
                  <Image
                    src={post.memory_image_url}
                    alt={`${post.souvenir.name}の思い出`}
                    borderRadius="lg"
                    width="100%"
                    aspectRatio="3/2"
                    objectFit="contain"
                  />
                )}
                {post.memory_content && (
                  <Text fontSize="sm">{post.memory_content}</Text>
                )}
              </VStack>
            </CustomModal>
          </>
        )}
      </Box>
    </>
  )
}
