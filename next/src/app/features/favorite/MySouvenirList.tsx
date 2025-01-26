'use client'

import { Box, Stack, Text } from '@chakra-ui/react'
import MySouvenirCardWithMemoryModal from '../mypage/MySouvenirCardWithMemoryModal'
import CustomIcon from '@/components/atoms/CustomIcon'
import TextIconLink from '@/components/molecules/TextIconLink'
import SouvenirCard from '@/components/organisms/Souvenir/SouvenirCard'
import SouvenirCardList from '@/components/organisms/Souvenir/SouvenirCardList'
import { useFavoriteStore, useMyPostsStore } from '@/store/store'
import { PostType, SouvenirCardType } from '@/types/types'

type MySouvenirListProps = {
  type: 'myPost' | 'favoritedSouvenir'
}

const MySouvenirList = ({ type }: MySouvenirListProps) => {
  const { favoritedSouvenirs } = useFavoriteStore()
  const { myPosts } = useMyPostsStore()
  const hasNoSouvenirs =
    type === 'myPost' ? !myPosts.length : !favoritedSouvenirs.length
  const postsWithMemory = myPosts.filter(
    (post) => post.memory_image_url || post.memory_content,
  )
  console.log(postsWithMemory.length)

  return (
    <>
      {hasNoSouvenirs ? (
        <Stack spacing={2}>
          {type === 'myPost' ? (
            <>
              <Text fontSize="sm">記録したお土産はありません。</Text>
              <TextIconLink iconName="FaPen" iconPosition="left" href="/post">
                お土産を記録する
              </TextIconLink>
            </>
          ) : (
            <>
              <Text fontSize="sm">
                お気に入りに登録したお土産はありません。
              </Text>
              <TextIconLink
                iconName="FaSearch"
                iconPosition="left"
                href="/search"
              >
                お土産を検索する
              </TextIconLink>
            </>
          )}
        </Stack>
      ) : (
        <>
          {type === 'myPost' && postsWithMemory.length !== 0 && (
            <Text fontSize="xs" textAlign="right" color="gray.500" mb={4}>
              <Box
                as="span"
                bg="blue.500"
                color="white"
                borderRadius="md"
                px={1}
                py="2px"
                mr="2px"
              >
                <CustomIcon iconName="FaSearchPlus" />
              </Box>
              をクリックで思い出を表示
            </Text>
          )}
          <SouvenirCardList
            size="md"
            renderItem={(size) => (
              <>
                {type === 'myPost' ? (
                  <>
                    {myPosts.map((post: PostType) => (
                      <MySouvenirCardWithMemoryModal
                        key={post.alias_id}
                        post={post}
                      />
                    ))}
                  </>
                ) : (
                  <>
                    {favoritedSouvenirs.map((souvenir: SouvenirCardType) => (
                      <SouvenirCard
                        key={souvenir.alias_id}
                        size={size}
                        souvenir={souvenir}
                        isFavoritable={true}
                        rating={souvenir.average_rating || null}
                        hasTrashIcon={true}
                      />
                    ))}
                  </>
                )}
              </>
            )}
          />
        </>
      )}
    </>
  )
}

export default MySouvenirList
