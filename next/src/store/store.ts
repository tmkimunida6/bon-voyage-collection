import { create } from 'zustand'
import { CategoryType, SouvenirCardType } from '@/types/types'

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
  selectedSouvenir: { alias_id: '', name: '' },
  setSelectedSouvenir: (souvenir) => set({ selectedSouvenir: souvenir }),
}))
