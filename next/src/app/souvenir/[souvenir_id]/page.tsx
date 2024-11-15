import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import FavoriteButton from '@/app/features/favorite/FavoriteButton'
import CustomIcon from '@/components/atoms/CustomIcon'
import DataWithIcon from '@/components/molecules/DataWithIcon'
import SouvenirCard from '@/components/organisms/Souvenir/SouvenirCard'
import { SouvenirType } from '@/types/types'
import { fetchRelatedSouvenirData } from '@/utils/fetchRelatedSouvenirData'
import { fetchSouvenirData } from '@/utils/fetchSouvenirData'

type SouvenirDetailPageProps = {
  params: { souvenir_id: string }
}

export default async function SouvenirDetailPage({
  params,
}: SouvenirDetailPageProps) {
  const { souvenir_id } = params
  const souvenirData = await fetchSouvenirData(souvenir_id)
  const relatedSouvenirData = await fetchRelatedSouvenirData(souvenir_id)

  return (
    <Stack spacing={6}>
      <HStack mb={6}>
        <Heading as="h1">お土産の詳細</Heading>
      </HStack>
      <Heading as="h2" fontSize="xl">
        {souvenirData.name}
      </Heading>
      <HStack justifyContent="center" spacing={4}>
        <Button
          variant="primary"
          as={NextLink}
          href={`/souvenir/new?souvenir_id=${souvenir_id}`}
          gap={2}
        >
          <CustomIcon iconName="FaGift" />
          買った！
        </Button>
        <FavoriteButton currentSouvenir={souvenirData} isIconButton={false} position='absolute' />
      </HStack>
      <Stack spacing={4}>
        <Image
          src={souvenirData.image_url}
          alt={souvenirData.name}
          aspectRatio="3/2"
          objectFit="contain"
        />
        <Stack spacing={2}>
          <DataWithIcon iconName="FaClipboardList">
            <Text fontSize="xs">
              {souvenirData.category.parent.name} - {souvenirData.category.name}
            </Text>
          </DataWithIcon>
          {souvenirData.description && (
            <Text fontSize="sm">{souvenirData.description}</Text>
          )}
        </Stack>
      </Stack>
      {relatedSouvenirData.length && (
        <Stack spacing={4}>
          <Heading as="h3" fontSize="lg">
            似ているお土産
          </Heading>
          <Box overflowX="auto" mx={-6} px={6}>
            <Flex flexWrap="nowrap" gap={4} w="max-content">
              {relatedSouvenirData.map((souvenir: SouvenirType) => (
                <SouvenirCard
                  key={souvenir.alias_id}
                  size="md"
                  isFavoritable={false}
                  souvenir={souvenir}
                />
              ))}
            </Flex>
          </Box>
        </Stack>
      )}
    </Stack>
  )
}
