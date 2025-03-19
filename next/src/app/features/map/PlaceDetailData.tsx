import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Stack,
  Link as ChakraLink,
  Flex,
  Text,
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

  return (
    <Box bg="gray.50" p={4}>
      <TableContainer color="brand.black">
        <Table
          variant="simple"
          size="sm"
          sx={{
            '& th, & td': {
              border: 'none',
              px: 0,
              py: 2,
              verticalAlign: 'top',
              fontSize: 'sm',
            },
            '& th': {
              pr: 4,
            },
          }}
        >
          <Tbody>
            <Tr>
              <Th>住所</Th>
              <Td whiteSpace="normal">{selectedMarker.address}</Td>
            </Tr>
            <Tr>
              <Th>営業時間</Th>
              <Td whiteSpace="normal">
                <Button
                  variant="ghost"
                  fontSize="xs"
                  fontWeight="normal"
                  color="brand.black"
                  p={0}
                  h="auto"
                  onClick={() => setIsOpeningHoursVisible((prev) => !prev)}
                >
                  {selectedMarker.weekday_text[dayOfWeek]
                    .replace(':', ' ')
                    .replaceAll('時', ':')
                    .replaceAll('分', '')}
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
                        {day
                          .replace('曜日', '')
                          .replace(':', '　')
                          .replaceAll('時', ':')
                          .replaceAll('分', '')}
                      </Text>
                    ))}
                  </Stack>
                )}
              </Td>
            </Tr>
            <Tr>
              <Th>URL</Th>
              <Td whiteSpace="normal">
                <ChakraLink
                  as={NextLink}
                  href={selectedMarker.website}
                  color="brand.link"
                  target="_blank"
                  rel="noopener"
                  wordBreak="break-all"
                >
                  {selectedMarker.website}
                </ChakraLink>
              </Td>
            </Tr>
            <Tr>
              <Th>評価</Th>
              <Td whiteSpace="normal">
                <Flex alignItems="center" gap={1}>
                  {selectedMarker.rating}
                  <Rating rating={selectedMarker.rating} />(
                  {selectedMarker.user_ratings_total}件)
                </Flex>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
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
    </Box>
  )
}
