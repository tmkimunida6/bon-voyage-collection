import { create } from 'zustand'
import { SouvenirCardType } from '@/types/types'

// 「欲しい！」お土産一覧
type FavoritedSouvenirsState = {
  favoritedSouvenirs: Array<SouvenirCardType>
  setFavoritedSouvenirs: (souvenirs: Array<SouvenirCardType>) => void
  addFavoritedSouvenir: (souvenir: SouvenirCardType) => void
  removeFavoritedSouvenir: (souvenir: SouvenirCardType) => void
}

export const useFavoriteStore = create<FavoritedSouvenirsState>((set) => ({
  favoritedSouvenirs: [],
  setFavoritedSouvenirs: (souvenirs) => set({ favoritedSouvenirs: souvenirs }),
  addFavoritedSouvenir: (souvenir) =>
    set((state) => ({
      favoritedSouvenirs: [...state.favoritedSouvenirs, souvenir],
    })),
  removeFavoritedSouvenir: (souvenir) =>
    set((state) => ({
      favoritedSouvenirs: state.favoritedSouvenirs.filter(
        (prev_souvenir) => prev_souvenir.alias_id !== souvenir.alias_id,
      ),
    })),
}))
