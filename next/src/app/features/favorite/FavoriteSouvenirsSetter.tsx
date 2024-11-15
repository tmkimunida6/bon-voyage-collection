/* eslint react-hooks/exhaustive-deps: 0 */

'use client'

import { useEffect } from 'react'
import { useFavoriteStore } from '@/store/store'
import { SouvenirType } from '@/types/types'

export default function FavoriteSouvenirsSetter({
  favoritedSouvenirsData,
}: {
  favoritedSouvenirsData: Array<SouvenirType>
}) {
  const { favoritedSouvenirs, setFavoritedSouvenirs } = useFavoriteStore()

  useEffect(() => {
    if (!favoritedSouvenirs.length) {
      setFavoritedSouvenirs(favoritedSouvenirsData)
    }
  }, [])

  return <></>
}
