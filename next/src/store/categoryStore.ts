import { create } from 'zustand'
import { CategoryType } from '@/types/types'

// カテゴリー選択
type CategoryState = {
  selectedCategory: CategoryType
  setSelectedCategory: (category: CategoryType) => void
}
export const useCategoryStore = create<CategoryState>((set) => ({
  selectedCategory: { id: '', name: '' },
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}))
