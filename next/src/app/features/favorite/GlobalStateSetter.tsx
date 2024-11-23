/* eslint react-hooks/exhaustive-deps: 0 */

'use client'

import { useEffect } from 'react'
import {
  useCurrentUserStore,
  useFavoriteStore,
  useMyPostsStore,
} from '@/store/store'
import { PostType, SouvenirCardType, UserType } from '@/types/types'

type GlobalStateSetterProps = {
  userData: UserType
  favoritedSouvenirsData: Array<SouvenirCardType>
  myPostsData: Array<PostType>
}

export default function GlobalStateSetter({
  userData,
  favoritedSouvenirsData,
  myPostsData,
}: GlobalStateSetterProps) {
  const { favoritedSouvenirs, setFavoritedSouvenirs } = useFavoriteStore()
  const { myPosts, setMyPosts } = useMyPostsStore()
  const { setCurrentUser } = useCurrentUserStore()

  // 「欲しい！」追加済みのお土産をセット
  useEffect(() => {
    if (!favoritedSouvenirs.length) {
      setFavoritedSouvenirs(favoritedSouvenirsData)
    }
    if (!myPosts.length) {
      setMyPosts(myPostsData)
    }
  }, [userData])

  // ログイン中のユーザーをセット
  useEffect(() => {
    setCurrentUser(userData)
  }, [userData])

  return <></>
}
