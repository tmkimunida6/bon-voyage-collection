import {
  Box,
  Button,
  Stack,
  Link as ChakraLink,
  Flex,
  Text,
  HStack,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useState } from 'react'
import CustomIcon from '@/components/atoms/CustomIcon'
import Rating from '@/components/molecules/Rating'
import TextIconLink from '@/components/molecules/TextIconLink'
import { markerType } from '@/types/types'

type PlaceDetailDataProps = {
  selectedMarker: markerType
}

export default function PlaceDetailData({
  selectedMarker,
}: PlaceDetailDataProps) {
  const [isOpeningHoursVisible, setIsOpeningHoursVisible] =
    useState<boolean>(false)

  // 今日の曜日
  const today = new Date()
  const dayOfWeek = today.getDay() - 1

  // 時間を00:00の形に変換
  const convertTime = (timeString: string) => {
    const convertedTime = timeString.replaceAll(/(\d+)時(\d+)分/g, '$1:$2')
    return convertedTime
  }

  return (
    <Stack bg="gray.50" p={4} spacing={2}>
      {selectedMarker.address && (
        <Flex gap={4}>
          <CustomIcon iconName="FaLocationDot" color="brand.primary" mt={1} />
          <Text fontSize="sm">{selectedMarker.address}</Text>
        </Flex>
      )}
      {selectedMarker.weekday_text && (
        <Flex gap={4}>
          <CustomIcon iconName="FaRegClock" color="brand.primary" mt={1} />
          <Flex justifyContent="center" flexDirection="column">
            <Button
              variant="ghost"
              fontSize="sm"
              fontWeight="normal"
              color="brand.black"
              p={0}
              h="auto"
              lineHeight="1.5"
              onClick={() => setIsOpeningHoursVisible((prev) => !prev)}
            >
              {convertTime(
                selectedMarker.weekday_text[dayOfWeek].replace(':', ' '),
              )}
              <CustomIcon
                iconName={
                  isOpeningHoursVisible ? 'FaChevronUp' : 'FaChevronDown'
                }
                fontSize="xs"
                ml={2}
              />
            </Button>
            {isOpeningHoursVisible && (
              <Stack spacing="2px" mt={2}>
                {selectedMarker.weekday_text.map((day, index) => (
                  <Text key={index} fontSize="xs">
                    {convertTime(day.replace(':', '　').replace('曜日', ''))}
                  </Text>
                ))}
              </Stack>
            )}
          </Flex>
        </Flex>
      )}
      {selectedMarker.website && (
        <HStack spacing={4} w="100%">
          <CustomIcon iconName="FaEarthAmericas" color="brand.primary" />
          <ChakraLink
            as={NextLink}
            href={selectedMarker.website}
            color="brand.link"
            target="_blank"
            rel="noopener"
            wordBreak="break-all"
            w="100%"
            display="block"
          >
            <Text
              as="span"
              display="block"
              w="calc(100% - var(--chakra-space-2) - 1em)"
              fontSize="sm"
              isTruncated
            >
              {selectedMarker.website}
            </Text>
          </ChakraLink>
        </HStack>
      )}
      {selectedMarker.rating && (
        <HStack spacing={4}>
          <CustomIcon iconName="FaRegStar" color="brand.primary" />
          <Flex alignItems="center" gap={1} fontSize="sm">
            {selectedMarker.rating}
            <Rating rating={selectedMarker.rating} />(
            {selectedMarker.user_ratings_total}件)
          </Flex>
        </HStack>
      )}
      <Flex justifyContent="flex-end">
        <TextIconLink
          iconPosition="right"
          iconName="FaExternalLinkAlt"
          href={selectedMarker.url}
          openInNew
        >
          Googleマップで見る
        </TextIconLink>
      </Flex>
    </Stack>
  )
}
