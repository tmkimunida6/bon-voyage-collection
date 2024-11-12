import { create } from 'zustand'
import { CategoryType, SouvenirCardType, SouvenirType } from '@/types/types'

type categoryState = {
  selectedCategory: CategoryType
  setSelectedCategory: (category: CategoryType) => void
}
export const useCategoryStore = create<categoryState>((set) => ({
  selectedCategory: { id: '', name: '' },
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}))

type souvenirState = {
  selectedSouvenir: SouvenirCardType
  setSelectedSouvenir: (souvenir: SouvenirCardType) => void
}
export const useSouvenirStore = create<souvenirState>((set) => ({
  selectedSouvenir: { alias_id: '', name: '', image_url: '' },
  setSelectedSouvenir: (souvenir) => set({ selectedSouvenir: souvenir }),
}))

type FavoritedSouvenirsState = {
  favoritedSouvenirs: Array<SouvenirType>
  setFavoritedSouvenirs: (souvenirs: Array<SouvenirType>) => void
  addFavoritedSouvenir: (souvenir: SouvenirType) => void
  removeFavoritedSouvenir: (souvenir: SouvenirType) => void
}
export const useFavoriteStore = create<FavoritedSouvenirsState>((set) => ({
  favoritedSouvenirs: [],
  setFavoritedSouvenirs: (souvenirs) => set({ favoritedSouvenirs: souvenirs }),
  addFavoritedSouvenir: (souvenir) => set((state) => ({
    favoritedSouvenirs: [...state.favoritedSouvenirs, souvenir],
  })),
  removeFavoritedSouvenir: (souvenir) => set((state) => ({
    favoritedSouvenirs: state.favoritedSouvenirs.filter(
      (prev_souvenir) => prev_souvenir.alias_id !== souvenir.alias_id
    ),
  })),
}))
