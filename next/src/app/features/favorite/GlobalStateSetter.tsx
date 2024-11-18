/* eslint react-hooks/exhaustive-deps: 0 */

'use client'

import { useEffect } from 'react'
import { useCurrentUserStore, useFavoriteStore } from '@/store/store'
import { SouvenirCardType, UserType } from '@/types/types'

type GlobalStateSetterProps = {
  userData: UserType
  favoritedSouvenirsData: Array<SouvenirCardType>
}

export default function GlobalStateSetter({
  userData,
  favoritedSouvenirsData,
}: GlobalStateSetterProps) {
  const { favoritedSouvenirs, setFavoritedSouvenirs } = useFavoriteStore()
  const { setCurrentUser } = useCurrentUserStore()

  // 「欲しい！」追加済みのお土産をセット
  useEffect(() => {
    if (!favoritedSouvenirs.length) {
      setFavoritedSouvenirs(favoritedSouvenirsData)
    }
  }, [userData])

  // ログイン中のユーザーをセット
  useEffect(() => {
    setCurrentUser(userData)
  }, [userData])

  return <></>
}
