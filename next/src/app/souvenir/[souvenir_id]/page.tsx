import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import DataWithIcon from '@/components/molecules/DataWithIcon'
import SouvenirCard from '@/components/organisms/Souvenir/SouvenirCard'
import { SouvenirCardType } from '@/types/types'
import { fetchRelatedSouvenirData } from '@/utils/fetchRelatedSouvenirData'
import { fetchSouvenirData } from '@/utils/fetchSouvenirData'

type SouvenirDetailPageProps = {
  params: { souvenir_id: number }
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
      <Image src="https://placehold.jp/1080x720.png" alt={souvenirData.name} />
      <DataWithIcon iconName="FaClipboardList">
        <Text>
          {souvenirData.category.parent.name} - {souvenirData.category.name}
        </Text>
      </DataWithIcon>
      {souvenirData.description && <Text>{souvenirData.description}</Text>}
      {relatedSouvenirData.length && (
        <Stack spacing={4}>
          <Heading as="h3" fontSize="lg">
            似ているお土産
          </Heading>
          <Box overflowX="auto" mx={-6} px={6}>
            <Flex flexWrap="nowrap" gap={4} w="max-content">
              {relatedSouvenirData.map((souvenir: SouvenirCardType) => (
                <SouvenirCard
                  key={souvenir.id}
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
