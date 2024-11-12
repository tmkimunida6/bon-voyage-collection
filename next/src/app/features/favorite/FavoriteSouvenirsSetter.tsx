'use client'

import { useFavoriteStore } from "@/store/store"
import { SouvenirType } from "@/types/types"
import { useEffect } from "react"

export default function FavoriteSouvenirsSetter({ favoritedSouvenirsData }: { favoritedSouvenirsData: Array<SouvenirType>}) {
  const { favoritedSouvenirs, setFavoritedSouvenirs } = useFavoriteStore()

  useEffect(() => {
    !favoritedSouvenirs.length && setFavoritedSouvenirs(favoritedSouvenirsData)
  }, [])

  return <></>
}