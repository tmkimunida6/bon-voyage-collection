/* eslint @typescript-eslint/no-unused-vars: 0 */

'use client'

import {
  Accordion,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Link,
  Spinner,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useState } from 'react'
import TinderCard from 'react-tinder-card'
import RecommendSwipeIcon from './RecommendSwipeIcon'
import RecommendCard from '@/app/recommend/RecommendCard'
import CustomAccordionItem from '@/components/molecules/CustomAccordionItem'
import SouvenirCard from '@/components/organisms/Souvenir/SouvenirCard'
import SouvenirCardList from '@/components/organisms/Souvenir/SouvenirCardList'
import { SouvenirDetailType } from '@/types/types'

type RecommendCardSwiperProps = {
  fetchedRecommendResult: Array<SouvenirDetailType>
}

export default function RecommendCardSwiper({
  fetchedRecommendResult,
}: RecommendCardSwiperProps) {
  const [recommendSouvenirs, setRecommendSouvenirs] = useState<
    Array<SouvenirDetailType>
  >(fetchedRecommendResult)
  const [currentIndex, setCurrentIndex] = useState(
    fetchedRecommendResult.length - 1,
  )
  const [favorites, setFavorites] = useState<Array<SouvenirDetailType>>([])

  const handleSwipe = (direction: string, souvenir: SouvenirDetailType) => {
    if (direction === 'right') {
      setFavorites((prev) => [...prev, souvenir])
    }
    setCurrentIndex((prev) => prev - 1)
  }

  const handleCardLeftScreen = (alias_id: string) => {
    setRecommendSouvenirs((prevSouvenirs) =>
      prevSouvenirs.filter((souvenir) => souvenir.alias_id !== alias_id),
    )
  }

  return (
    <>
      {currentIndex === -1 ? (
        <Card bg="white" cursor="pointer" w="100%" maxW={360} h={360}>
          <CardBody p={4}>
            <Stack align="center" justify="center" spacing={0} h="100%">
              <Heading fontSize="18px" textAlign="center" mb={4}>
                会員登録をして
                <br />
                欲しいお土産を保存しましょう
              </Heading>
              <Button variant="primary" as={NextLink} href="/" size="sm" mb={8}>
                会員登録へ進む
              </Button>
              <Text>
                もっとお土産を探したい方は
                <Link as={NextLink} href="/search" color="brand.link">
                  検索ページへ
                </Link>
              </Text>
            </Stack>
          </CardBody>
        </Card>
      ) : (
        <>
          <RecommendSwipeIcon position="left" />
          <Box position="relative" w="100%" maxW={360} h={360}>
            {recommendSouvenirs.map((souvenir, index) => (
              <TinderCard
                key={souvenir.alias_id}
                onSwipe={(dir) => handleSwipe(dir, souvenir)}
                onCardLeftScreen={() => handleCardLeftScreen(souvenir.alias_id)}
                preventSwipe={['up', 'down']}
              >
                <Box
                  position="absolute"
                  display={index === currentIndex ? 'block' : 'none'}
                  w="100%"
                  h="100%"
                >
                  <RecommendCard souvenir={souvenir} rating="4.5" />
                </Box>
              </TinderCard>
            ))}
          </Box>
          <RecommendSwipeIcon position="right" />
        </>
      )}
      {currentIndex === -1 && (
        <Accordion allowMultiple w="100%">
          <CustomAccordionItem title="欲しい！に追加したお土産一覧">
            <Box py={4}>
              <SouvenirCardList
                size="md"
                renderItem={(size) => (
                  <>
                    {favorites.map((souvenir: SouvenirDetailType) => (
                      <SouvenirCard
                        key={souvenir.alias_id}
                        size={size}
                        isFavoritable={true}
                        souvenir={souvenir}
                        rating={souvenir.average_rating || null}
                      />
                    ))}
                  </>
                )}
              />
            </Box>
          </CustomAccordionItem>
        </Accordion>
      )}
    </>
  )
}
