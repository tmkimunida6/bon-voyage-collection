/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint react-hooks/exhaustive-deps: 0 */

'use client'

import {
  Avatar,
  Button,
  Card,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { SetStateAction, useEffect, useState } from 'react'
import FavoriteButton from '../favorite/FavoriteButton'
import DeletePostButton from './DeletePostButton'
import CustomIcon from '@/components/atoms/CustomIcon'
import Rating from '@/components/molecules/Rating'
import { useCurrentUserStore } from '@/store/store'
import { PostType, timelineResultType } from '@/types/types'

type PostCardProps = {
  post: PostType
  setTimelineResult: (state: SetStateAction<timelineResultType>) => void
}

type addressComponentType = {
  long_name: string
  short_name: string
  types: Array<string>
}

const PostCard = ({ post, setTimelineResult }: PostCardProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [placeName, setPlaceName] = useState<string>('')
  const [countryName, setCountryName] = useState<string>('')
  const [cityName, setCityName] = useState<string>('')
  const { currentUser } = useCurrentUserStore()

  // Google Map APIから情報取得
  useEffect(() => {
    const fetchPlaceData = async () => {
      if (!post.place_id) return

      try {
        const res = await fetch(`/api/detail?placeId=${post.place_id}`)
        const data = await res.json()

        if (data.status === 'OK') {
          setPlaceName(data.result.name)

          // 国名取得
          const addressComponents = data.result.address_components
          const country = addressComponents.find(
            (component: addressComponentType) =>
              component.types.includes('country'),
          )
          const city = addressComponents.find(
            (component: addressComponentType) =>
              component.types.includes('administrative_area_level_1'),
          )
          if (country) {
            setCountryName(country.long_name)
          }
          if (city) {
            setCityName(city.long_name)
          }
        } else {
          console.log(data)
          return
        }
      } catch (error: any) {
        console.log(error)
        return
      }
    }
    fetchPlaceData()
  }, [])

  return (
    <Card p={4} boxShadow="0 0 15px 0 rgba(0, 0, 0, 0.25)">
      <Stack spacing={2}>
        <HStack>
          <Avatar
            size="xs"
            src={post.user.image || 'https://bit.ly/broken-link'}
          />
          <Text fontSize="xs">
            {post.user.nickname || `user_${post.user.alias_id}`}
          </Text>
        </HStack>
        <HStack spacing={4}>
          <Heading fontSize="sm">
            <ChakraLink
              as={NextLink}
              href={`/souvenir/${post.souvenir.alias_id}`}
            >
              {post.souvenir.name}
            </ChakraLink>
          </Heading>
          <FavoriteButton
            currentSouvenir={post.souvenir}
            isIconButton={true}
            position="static"
          />
          {currentUser && currentUser.alias_id === post.user.alias_id && (
            <DeletePostButton
              post={post}
              setTimelineResult={setTimelineResult}
            />
          )}
        </HStack>
        {post.rating && <Rating rating={Number(post.rating)} />}
        {post.review && (
          <Stack spacing={1}>
            <Text
              fontSize="sm"
              noOfLines={post.review.length > 75 && !isVisible ? 3 : undefined}
            >
              {post.review}
            </Text>
            {post.review.length > 75 && (
              <HStack spacing={1} width="max-content" ml="auto">
                <Button
                  variant="ghost"
                  fontSize="xs"
                  color="brand.link"
                  p={0}
                  h="auto"
                  onClick={() => setIsVisible((prev) => !prev)}
                >
                  {isVisible ? '閉じる' : '続きを読む'}
                </Button>
                <CustomIcon
                  iconName={isVisible ? 'FaChevronUp' : 'FaChevronDown'}
                  color="brand.link"
                  fontSize="xs"
                />
              </HStack>
            )}
          </Stack>
        )}
      </Stack>
      <Flex gap={4} mt={4}>
        <Image
          src={post.image_url ? post.image_url : post.souvenir.image_url}
          alt={post.souvenir.name}
          borderRadius="sm"
          objectFit="contain"
          aspectRatio="3/2"
          maxW="calc(50% - 0.5rem)"
          bg="gray.100"
        />
        <Stack maxW="calc(50% - 0.5rem)">
          {countryName && (
            <HStack spacing={1}>
              <CustomIcon iconName="FaHandHoldingHeart" color="brand.primary" />
              <Text fontSize="xs" isTruncated>
                {cityName} / {countryName}
              </Text>
            </HStack>
          )}
          {placeName && (
            <HStack spacing={1}>
              <CustomIcon iconName="FaLocationDot" color="brand.primary" />
              <ChakraLink
                as={NextLink}
                href={`https://www.google.com/maps/place/?q=place_id:${post.place_id}`}
                fontSize="xs"
                display="flex"
                alignItems="center"
                gap="2px"
                color="brand.link"
                target="_blank"
                rel="noopener"
              >
                {placeName}
                <CustomIcon iconName="FaExternalLinkAlt" />
              </ChakraLink>
            </HStack>
          )}
          {(post.for_who || post.age) && (
            <HStack spacing={1}>
              <CustomIcon iconName="FaHandHoldingHeart" color="brand.primary" />
              <Text fontSize="xs" isTruncated>
                {post.for_who} {post.for_who && post.age && '/'} {post.age}
              </Text>
            </HStack>
          )}
        </Stack>
      </Flex>
    </Card>
  )
}

export default PostCard
