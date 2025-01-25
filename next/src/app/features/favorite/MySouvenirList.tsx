'use client'

import MySouvenirCardWithMemoryModal from '../mypage/MySouvenirCardWithMemoryModal'
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

  return (
    <SouvenirCardList
      size="md"
      renderItem={(size) => (
        <>
          {type === 'myPost' ? (
            <>
              {myPosts.map((post: PostType) => (
                <MySouvenirCardWithMemoryModal key={post.alias_id} post={post} />
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
  )
}

export default MySouvenirList
