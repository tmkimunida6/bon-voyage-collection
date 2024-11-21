/* eslint @typescript-eslint/no-unused-vars: 0 */

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
import PostCardList from '@/app/features/post/PostCardList'
import CustomIcon from '@/components/atoms/CustomIcon'
import DataWithIcon from '@/components/molecules/DataWithIcon'
import Rating from '@/components/molecules/Rating'
import SouvenirCard from '@/components/organisms/Souvenir/SouvenirCard'
import { SouvenirCardType } from '@/types/types'
import { fetchPostDataBySouvenir } from '@/utils/fetchPostDataBySouvenir'
import { fetchRelatedSouvenirData } from '@/utils/fetchRelatedSouvenirData'
import { fetchSouvenirData } from '@/utils/fetchSouvenirData'
import { fetchUserState } from '@/utils/fetchUserState'

type SouvenirDetailPageProps = {
  params: { souvenir_id: string }
}

export async function generateMetadata({ params }: SouvenirDetailPageProps) {
  const souvenirData = await fetchSouvenirData(params.souvenir_id)
  return {
    title: `${souvenirData.name}（お土産詳細） | Bon Voyage Collection`,
    description:
      'ユーザーが投稿したデータによるお土産の詳細情報です。気になったお土産は「欲しい」に追加しましょう。',
  }
}

export default async function SouvenirDetailPage({
  params,
}: SouvenirDetailPageProps) {
  const { souvenir_id } = params

  const relatedSouvenirData = await fetchRelatedSouvenirData(souvenir_id)
  const souvenirData = await fetchSouvenirData(souvenir_id)
  let postsBySouvenir
  try {
    const userData = await fetchUserState()
    postsBySouvenir = await fetchPostDataBySouvenir(
      souvenir_id,
      1,
      userData.alias_id,
    )
  } catch (error) {
    postsBySouvenir = null
  }

  return (
    <Stack spacing={6}>
      <HStack mb={6}>
        <Heading as="h1">お土産の詳細</Heading>
      </HStack>
      <Stack spacing={2}>
        <Heading as="h2" fontSize="xl">
          {souvenirData.name}
        </Heading>
        <HStack gap={2}>
          <Text fontSize="xs">平均おすすめ度</Text>
          <Rating rating={Number(souvenirData.average_rating)} />
        </HStack>
      </Stack>
      <HStack justifyContent="center" spacing={4}>
        <Button
          variant="primary"
          as={NextLink}
          href={`/post?souvenir_id=${souvenirData.alias_id}&souvenir_name=${souvenirData.name}`}
          gap={2}
        >
          <CustomIcon iconName="FaGift" />
          買った！
        </Button>
        <FavoriteButton
          currentSouvenir={souvenirData}
          isIconButton={false}
          position="absolute"
        />
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
      {relatedSouvenirData && relatedSouvenirData.length && (
        <Stack spacing={4}>
          <Heading as="h3" fontSize="lg">
            似ているお土産
          </Heading>
          <Box
            overflowX="auto"
            mx={{ base: -4, sm: -6 }}
            px={{ base: 4, sm: 6 }}
          >
            <Flex flexWrap="nowrap" gap={4} w="max-content">
              {relatedSouvenirData.map((souvenir: SouvenirCardType) => (
                <Box maxW="150px" key={souvenir.alias_id}>
                  <SouvenirCard
                    size="md"
                    isFavoritable={false}
                    souvenir={souvenir}
                    rating={souvenir.average_rating || null}
                  />
                </Box>
              ))}
            </Flex>
          </Box>
        </Stack>
      )}
      <Stack spacing={4}>
        <Heading as="h3" fontSize="lg">
          投稿・レビュー
        </Heading>
        {postsBySouvenir && postsBySouvenir.posts.length ? (
          <PostCardList
            fetchedTimelineResult={postsBySouvenir}
            souvenir_id={souvenir_id}
            page="detail"
          />
        ) : (
          <Text>まだ投稿はありません。</Text>
        )}
      </Stack>
    </Stack>
  )
}
