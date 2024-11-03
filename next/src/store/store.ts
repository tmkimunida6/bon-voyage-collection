import { create } from 'zustand'
import { CategoryType } from '@/types/types'

type categoryState = {
  selectedCategory: CategoryType
  setSelectedCategory: (category: CategoryType) => void
}
export const useCategoryStore = create<categoryState>((set) => ({
  selectedCategory: { id: 0, name: '' },
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}))