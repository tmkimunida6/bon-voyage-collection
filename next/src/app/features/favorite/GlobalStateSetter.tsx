/* eslint react-hooks/exhaustive-deps: 0 */

'use client'

import { useEffect } from 'react'
import {
  useCurrentUserStore,
  useFavoriteStore,
  useMyPostsStore,
} from '@/store/store'
import { PostType, SouvenirCardType, CurrentUserType } from '@/types/types'

type GlobalStateSetterProps = {
  userData: CurrentUserType
  favoritedSouvenirsData: Array<SouvenirCardType>
  myPostsData: Array<PostType>
}

export default function GlobalStateSetter({
  userData,
  favoritedSouvenirsData,
  myPostsData,
}: GlobalStateSetterProps) {
  const { favoritedSouvenirs, setFavoritedSouvenirs } = useFavoriteStore()
  const { setMyPosts } = useMyPostsStore()
  const { setCurrentUser } = useCurrentUserStore()

  // 「欲しい！」追加済みのお土産をセット
  useEffect(() => {
    if (!favoritedSouvenirs.length) {
      setFavoritedSouvenirs(favoritedSouvenirsData)
    }
  }, [userData])

  // 自分の投稿をセット
  useEffect(() => {
    setMyPosts(myPostsData)
  }, [myPostsData])

  // ログイン中のユーザーをセット
  useEffect(() => {
    setCurrentUser(userData)
  }, [userData])

  return <></>
}
