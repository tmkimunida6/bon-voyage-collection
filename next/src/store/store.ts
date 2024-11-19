import { create } from 'zustand'
import {
  CategoryType,
  SouvenirSelectType,
  SouvenirCardType,
  UserType,
} from '@/types/types'

// カテゴリー選択
type categoryState = {
  selectedCategory: CategoryType
  setSelectedCategory: (category: CategoryType) => void
}
export const useCategoryStore = create<categoryState>((set) => ({
  selectedCategory: { id: '', name: '' },
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}))

// お土産選択
type souvenirState = {
  selectedSouvenir: SouvenirSelectType
  setSelectedSouvenir: (souvenir: SouvenirSelectType) => void
}
export const useSouvenirStore = create<souvenirState>((set) => ({
  selectedSouvenir: { alias_id: '', name: '' },
  setSelectedSouvenir: (souvenir) => set({ selectedSouvenir: souvenir }),
}))

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

// ログイン中ユーザー
type CurrentUserState = {
  currentUser: UserType | null
  setCurrentUser: (user: UserType) => void
}
export const useCurrentUserStore = create<CurrentUserState>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
}))
