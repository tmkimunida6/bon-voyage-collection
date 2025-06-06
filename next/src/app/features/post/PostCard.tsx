/* eslint @typescript-eslint/no-unused-vars: 0 */
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
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { SetStateAction, useEffect, useState } from 'react'
import CountryFlag from 'react-country-flag'
import FavoriteButton from '../favorite/FavoriteButton'
import DeletePostButton from './DeletePostButton'
import CustomIcon from '@/components/atoms/CustomIcon'
import Rating from '@/components/molecules/Rating'
import CustomModal from '@/components/organisms/modal/CustomModal'
import { useCurrentUserStore } from '@/store/index'
import { PostType, timelineResultType } from '@/types/types'

type PostCardProps = {
  post: PostType
  setTimelineResult: (state: SetStateAction<timelineResultType>) => void
  page: 'timeline' | 'detail'
}

type addressComponentType = {
  long_name: string
  short_name: string
  types: Array<string>
}

const PostCard = ({ post, setTimelineResult, page }: PostCardProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [placeData, setPlaceData] = useState({
    placeName: '',
    countryCode: '',
    countryName: '',
    cityName: '',
    url: '',
  })
  const { currentUser } = useCurrentUserStore()
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Google Map APIから情報取得
  useEffect(() => {
    const fetchPlaceData = async () => {
      if (!post.place_id) return

      try {
        const res = await fetch(`/api/detail?placeId=${post.place_id}`)
        const data = await res.json()

        if (data.status === 'OK') {
          // Place情報取得
          const addressComponents = data.result.address_components
          const country = addressComponents.find(
            (component: addressComponentType) =>
              component.types.includes('country'),
          )
          const city = addressComponents.find(
            (component: addressComponentType) =>
              component.types.includes('administrative_area_level_1'),
          )

          setPlaceData({
            ...placeData,
            placeName: data.result.name,
            countryCode: country ? country.short_name : '',
            countryName: country ? country.long_name : '',
            cityName: city ? city.long_name : '',
            url: data.result.url,
          })
        } else {
          return
        }
      } catch (error) {
        return
      }
    }
    fetchPlaceData()
  }, [])

  return (
    <Card p={4} boxShadow="0 0 15px 0 rgba(0, 0, 0, 0.25)">
      <Stack spacing={2}>
        <HStack>
          <Avatar size="xs" src={post.user.image || ''} />
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
        <Rating rating={post.rating ? Number(post.rating) : 0} />
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
        {!(page === 'detail' && !post.image_url) && (
          <>
            <Image
              src={post.image_url ? post.image_url : post.souvenir.image_url}
              alt={post.souvenir.name}
              borderRadius="sm"
              objectFit="cover"
              aspectRatio="4/3"
              maxW="calc(50% - 0.5rem)"
              cursor="pointer"
              onClick={onOpen}
            />
            <CustomModal
              isOpen={isOpen}
              onClose={onClose}
              modalTitle={post.souvenir.name}
              buttonText=""
              size="lg"
            >
              <VStack>
                <Image
                  src={
                    post.image_url ? post.image_url : post.souvenir.image_url
                  }
                  alt={post.souvenir.name}
                  borderRadius="sm"
                  objectFit="contain"
                  maxW="100%"
                />
              </VStack>
            </CustomModal>
          </>
        )}
        <Stack
          maxW={
            !(page === 'detail' && !post.image_url)
              ? 'calc(50% - 0.5rem)'
              : '100%'
          }
          spacing={1}
        >
          {(placeData.countryCode ||
            placeData.countryName ||
            placeData.cityName) && (
            <Flex gap={1} alignItems="flex-start">
              <HStack height="18px" flexShrink={0}>
                <CountryFlag
                  countryCode={placeData.countryCode}
                  style={{
                    border: '1px solid var(--chakra-colors-gray-100)',
                    height: 'auto',
                    marginTop: '2px',
                  }}
                  svg
                />
              </HStack>
              <Text fontSize="xs">
                {placeData.countryName}
                {placeData.countryName && placeData.cityName && '/'}
                {placeData.cityName}
              </Text>
            </Flex>
          )}
          {placeData.placeName && (
            <HStack spacing={1}>
              <CustomIcon iconName="FaLocationDot" color="brand.primary" />
              {placeData.url ? (
                <ChakraLink
                  as={NextLink}
                  href={`/map?place_id=${post.place_id}`}
                  fontSize="xs"
                  display="flex"
                  alignItems="center"
                  gap="2px"
                  color="brand.link"
                  isTruncated
                >
                  <Text as="span" isTruncated>
                    {placeData.placeName}
                  </Text>
                </ChakraLink>
              ) : (
                <Text fontSize="xs">{placeData.placeName}</Text>
              )}
            </HStack>
          )}
          {post.currency && post.price && (
            <HStack spacing={1}>
              <CustomIcon iconName="FaSackDollar" color="brand.primary" />
              <Text fontSize="xs">
                <Text as="span" mr={1}>
                  {post.currency}
                </Text>
                {post.price}
              </Text>
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
