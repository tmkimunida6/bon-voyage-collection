'use client'

import CustomModal from "@/components/organisms/modal/CustomModal";
import { SouvenirDetailType } from "@/types/types";
import { Image, useDisclosure, VStack } from "@chakra-ui/react";

type RecommendCardImageProps = {
  souvenir: SouvenirDetailType
}

export default function RecommendCardImage({ souvenir }: RecommendCardImageProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Image
        src={souvenir.image_url}
        alt={souvenir.name}
        borderRadius="sm"
        width="100%"
        aspectRatio="3/2"
        objectFit="cover"
        cursor="pointer"
        onClick={onOpen}
      />
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        modalTitle={souvenir.name}
        buttonText=""
        size="lg"
      >
        <VStack>
          <Image
            src={souvenir.image_url}
            alt={souvenir.name}
            borderRadius="sm"
            objectFit="contain"
            maxW="100%"
          />
        </VStack>
      </CustomModal>
    </>
  )
}