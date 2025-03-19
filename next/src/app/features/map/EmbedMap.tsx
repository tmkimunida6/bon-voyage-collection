/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint react-hooks/exhaustive-deps: 0 */

'use client'

import {
  Box,
  useDisclosure,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
  Button,
  Heading,
  useToast,
  Image,
} from '@chakra-ui/react'
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  MapCameraChangedEvent,
} from '@vis.gl/react-google-maps'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import CurrentLocationMarker from './CurrentLocationMarker'
import PlaceDetailData from './PlaceDetailData'
import CustomIcon from '@/components/atoms/CustomIcon'
import SouvenirCard from '@/components/organisms/Souvenir/SouvenirCard'
import SouvenirCardList from '@/components/organisms/Souvenir/SouvenirCardList'
import { markerType, PostType } from '@/types/types'

type EmbedMapProps = {
  posts: Array<PostType>
  placeId: string | null
}

export default function EmbedMap({ posts, placeId }: EmbedMapProps) {
  const [markers, setMarkers] = useState<Array<markerType>>([])
  const [center, setCenter] = useState({ lat: 21.2795422, lng: -157.8304625 }) // 初期値を東京駅に設定
  const [currentPos, setCurrentPos] = useState<{
    lat: number
    lng: number
  } | null>(null)
  const [selectedMarker, setSelectedMarker] = useState<markerType | null>(null)
  const [isDetailVisible, setIsDetailVisible] = useState(true)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  // 現在地の取得と監視
  useEffect(() => {
    if (navigator.geolocation) {
      // placeIdがない場合は現在地を中心に
      if (!placeId) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCenter({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
          },
          (error) => {
            toast({
              title: '現在地の取得に失敗しました。',
              status: 'error',
              duration: 5000,
              isClosable: true,
            })
          },
        )
      }

      // 現在地の監視
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setCurrentPos({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          toast({
            title: '現在地の取得に失敗しました。',
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        },
      )
      return () => navigator.geolocation.clearWatch(watchId)
    } else {
      toast({
        title: 'このブラウザでは、位置情報がサポートされていません。',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }, [])

  // Google Map APIから情報取得
  useEffect(() => {
    const fetchPlaceData = async () => {
      const newMarkers: Array<markerType> = []
      for (const post of posts) {
        if (post.place_id) {
          if (newMarkers.some((marker) => marker.place_id === post.place_id)) {
            continue // 重複する場合はスキップ
          }

          try {
            const res = await fetch(`/api/detail?placeId=${post.place_id}`)
            const data = await res.json()
            if (data.result) {
              const { lat, lng } = data.result.geometry.location
              newMarkers.push({
                place_id: data.result.place_id,
                lat,
                lng,
                name: data.result.name,
                address: data.result.formatted_address,
                weekday_text: data.result.opening_hours.weekday_text,
                website: data.result.website,
                rating: data.result.rating,
                user_ratings_total: data.result.user_ratings_total,
                url: data.result.url,
                marker_img: post.image_url || post.souvenir.image_url,
              })

              if (post.place_id === placeId) {
                setCenter({
                  lat,
                  lng,
                })
              }
            }
          } catch (error) {
            toast({
              title:
                'サーバーエラーが発生しました。時間をおいてから再度お試しください。',
              status: 'error',
              duration: 5000,
              isClosable: true,
            })
          }
        }
      }
      setMarkers(newMarkers)

      // URLにplaceIdがある場合デフォルトでモーダルを開いた状態にする
      if (placeId) {
        const initialMarker = newMarkers.find(
          (marker) => marker.place_id === placeId,
        )
        if (initialMarker) {
          setSelectedMarker(initialMarker)
          setIsDetailVisible(true)
          onOpen()
        }
      }
    }

    fetchPlaceData()
  }, [])

  // GoogleマップAPI Key / Map ID
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAP_MAP_ID
  if (!apiKey || !mapId) {
    redirect('/?status=server_error')
  }

  return (
    <Box w="100%" h="calc(100vh - 80px - 48px)">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultZoom={18}
          center={center}
          mapId={mapId}
          gestureHandling="greedy"
          onCameraChanged={(ev: MapCameraChangedEvent) =>
            setCenter(ev.detail.center)
          }
        >
          {markers.map((marker) => (
            <AdvancedMarker
              key={marker.place_id}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => {
                // ピンをクリックしたときに詳細情報を表示
                setSelectedMarker(marker)
                setIsDetailVisible(true)
                onOpen()
              }}
            >
              <Pin
                background={'var(--chakra-colors-brand-primary)'}
                borderColor={'var(--chakra-colors-brand-primary)'}
                scale={2}
              >
                <Image
                  src={marker.marker_img} // 画像のパス
                  alt={marker.name}
                  boxSize="48px"
                  borderRadius="50%"
                  objectFit="cover"
                />
              </Pin>
            </AdvancedMarker>
          ))}
          {currentPos && (
            <AdvancedMarker position={currentPos}>
              <CurrentLocationMarker />
            </AdvancedMarker>
          )}
        </Map>
      </APIProvider>
      {selectedMarker && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size="xl"
          scrollBehavior="inside"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader pl={4} pr="44px" fontSize="lg">
              <Stack spacing={1}>
                <Text as="span">{selectedMarker.name}</Text>
                <Button
                  variant="ghost"
                  fontSize="xs"
                  fontWeight="normal"
                  color="brand.secondary"
                  p={0}
                  h="auto"
                  onClick={() => setIsDetailVisible((prev) => !prev)}
                >
                  詳細を{isDetailVisible ? '閉じる' : '見る'}
                  <CustomIcon
                    iconName={isDetailVisible ? 'FaChevronUp' : 'FaChevronDown'}
                    fontSize="xs"
                    ml={2}
                  />
                </Button>
              </Stack>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody px={4} pb={10}>
              <Stack spacing={4}>
                {isDetailVisible && (
                  <PlaceDetailData selectedMarker={selectedMarker} />
                )}
                <Stack spacing={4}>
                  <Stack spacing={1}>
                    <Heading as="h2" fontSize="md">
                      この施設で買えるお土産
                    </Heading>
                    <Text fontSize="10px" color="gray.400">
                      ※ユーザー投稿による情報です。最新の情報はお店にお問い合わせください。
                    </Text>
                  </Stack>
                  <SouvenirCardList
                    size="sm"
                    renderItem={(size) => (
                      <>
                        {posts
                          .filter(
                            (post) => post.place_id === selectedMarker.place_id,
                          )
                          .map((post) => (
                            <SouvenirCard
                              key={post.souvenir.alias_id}
                              size={size}
                              isFavoritable={true}
                              souvenir={post.souvenir}
                              rating={post.souvenir.average_rating || null}
                              img={post.image_url || post.souvenir.image_url}
                            />
                          ))}
                      </>
                    )}
                  />
                </Stack>
              </Stack>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  )
}
