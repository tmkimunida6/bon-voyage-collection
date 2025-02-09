/* eslint @typescript-eslint/no-explicit-any: 0 */

'use client'

import {
  Accordion,
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Link,
  Stack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import TinderCard from 'react-tinder-card'
import RecommendSwipeIcon from './RecommendSwipeIcon'
import { favoriteBulkAction } from '@/actions/favoriteBulkAction'
import RecommendCard from '@/app/recommend/RecommendCard'
import CustomAccordionItem from '@/components/molecules/CustomAccordionItem'
import SouvenirCard from '@/components/organisms/Souvenir/SouvenirCard'
import SouvenirCardList from '@/components/organisms/Souvenir/SouvenirCardList'
import { useCurrentUserStore, useFavoriteStore } from '@/store/index'
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
  // const [skips, setSkips] = useState<Array<SouvenirDetailType>>([])
  const [loading, setLoading] = useState<boolean>(true)

  const { currentUser } = useCurrentUserStore()
  const { addFavoritedSouvenir } = useFavoriteStore()

  const toast = useToast()

  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      if (e.cancelable) {
        e.preventDefault()
      }
    }

    if (currentIndex >= 0) {
      // タッチイベントを無効化
      document.addEventListener('touchmove', preventDefault, { passive: false })
    } else {
      // 全てのスワイプが完了したらタッチイベントを有効化
      document.removeEventListener('touchmove', preventDefault)
    }

    return () => {
      document.removeEventListener('touchmove', preventDefault)
    }
  }, [currentIndex])

  const handleSwipe = (direction: string, souvenir: SouvenirDetailType) => {
    if (direction === 'right') {
      setFavorites((prev) => [...prev, souvenir])
      // } else if (direction === 'left') {
      //   setSkips((prev) => [...prev, souvenir])
    }
    setCurrentIndex((prev) => prev - 1)
  }

  const handleCardLeftScreen = (alias_id: string) => {
    setRecommendSouvenirs((prevSouvenirs) =>
      prevSouvenirs.filter((souvenir) => souvenir.alias_id !== alias_id),
    )

    // 全てのスワイプが完了したあとにlocalStorageに保存する
    console.log(currentIndex)
    if (currentIndex === 0) {
      // ログイン中の場合は「欲しい！」に追加 / 未ログイン時はlocalStorageに保存
      const favoritedAliasIds = favorites.map((favorite) => favorite.alias_id)
      if (currentUser?.isSignedIn) {
        const addRecommendSouvenirsToFavorite = async () => {
          try {
            await favoriteBulkAction(favoritedAliasIds)
          } catch (error: any) {
            toast({
              title: error.message,
              status: error.status,
              duration: 5000,
              isClosable: true,
            })
          } finally {
            setLoading(false)
            favorites.map((favorite) => addFavoritedSouvenir(favorite))
          }
        }

        if (favoritedAliasIds.length) {
          addRecommendSouvenirsToFavorite()
        } else {
          setLoading(false)
        }
      } else {
        setLoading(false)
        localStorage.setItem(
          'favoritedSouvenirs',
          JSON.stringify(favoritedAliasIds),
        )

        // スキップしたお土産を保存
        // const skippedAliasIds = skips.map((skip) => skip.alias_id)
        // localStorage.setItem('skipedSouvenirs', JSON.stringify(skippedAliasIds))
        // const existingSkipsAliasIds = localStorage.getItem('skipedSouvenirs')
        // let newSkipedAliasIds
        // if (existingSkipsAliasIds) {
        //   const json = JSON.parse(existingSkipsAliasIds)
        //   newSkipedAliasIds = [...json, ...skippedAliasIds]
        // } else {
        //   newSkipedAliasIds = skippedAliasIds
        // }
        // localStorage.setItem('skipedSouvenirs', JSON.stringify(newSkipedAliasIds))
      }
    }
  }

  // 結果によって内容だしわけ
  const recommendCompletedContent = useMemo(() => {
    // 条件に合うお土産がひとつもなかった場合
    if (!fetchedRecommendResult.length) {
      return {
        text: (
          <>
            条件に合うお土産が
            <br />
            見つかりませんでした...
          </>
        ),
        buttonText: 'もう一度試す',
        buttonHref: '/',
      }
    }

    // サインインしている場合
    if (currentUser?.isSignedIn) {
      if (favorites.length) {
        // 右にスワイプしたお土産がある場合
        return {
          text: (
            <>
              右にスワイプしたお土産を
              <br />
              「欲しい！」に{loading ? '追加中...' : '追加しました！'}
            </>
          ),
          buttonText: 'マイページへ',
          buttonHref: '/mypage?tab=favorite',
        }
      } else {
        // 全てスキップした場合
        return {
          text: (
            <>
              今回「欲しい！」に追加した
              <br />
              お土産はありません。
            </>
          ),
          buttonText: 'もう一度試す',
          buttonHref: '/',
        }
      }
    } else {
      // サインインしていない場合
      if (favorites.length) {
        // 右にスワイプしたお土産がある場合
        return {
          text: (
            <>
              右にスワイプしたお土産を
              <br />
              「欲しい！」に{loading ? '追加中...' : '追加しました！'}
            </>
          ),
          buttonText: '会員登録へ進む',
          buttonHref: '/register',
        }
      } else {
        // 全てスキップした場合
        return {
          text: (
            <>
              今回「欲しい！」に追加した
              <br />
              お土産はありません。
            </>
          ),
          buttonText: 'もう一度試す',
          buttonHref: '/',
        }
      }
    }
  }, [currentUser, favorites, loading, fetchedRecommendResult])

  return (
    <>
      {currentIndex < 0 ? (
        <Card bg="white" cursor="pointer" w="100%" maxW={360} h={360}>
          <CardBody p={4}>
            <Stack align="center" justify="center" spacing={0} h="100%">
              <Heading fontSize="18px" textAlign="center" mb={4}>
                {recommendCompletedContent.text}
              </Heading>
              <Button
                variant="primary"
                as={NextLink}
                href={recommendCompletedContent.buttonHref}
                size="sm"
                mb={8}
                isLoading={
                  currentUser?.isSignedIn && favorites.length ? loading : false
                }
              >
                {recommendCompletedContent.buttonText}
              </Button>
              <VStack spacing={1}>
                <Text>
                  もっとお土産を探したい方は
                  <Link as={NextLink} href="/search" color="brand.link">
                    検索ページへ
                  </Link>
                </Text>
                {currentUser?.isSignedIn ?? (
                  <Text fontSize="10px" color="gray.400" textAlign="center">
                    ※欲しいに追加したお土産は画面を閉じるまで保存されます。
                  </Text>
                )}
              </VStack>
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
      {currentIndex < 0 && !!favorites.length && (
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
