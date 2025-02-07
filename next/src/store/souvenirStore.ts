import { create } from 'zustand'
import { SouvenirSelectType } from '@/types/types'

// お土産選択
type SouvenirState = {
  selectedSouvenir: SouvenirSelectType
  setSelectedSouvenir: (souvenir: SouvenirSelectType) => void
}

export const useSouvenirStore = create<SouvenirState>((set) => ({
  selectedSouvenir: { alias_id: '', name: '' },
  setSelectedSouvenir: (souvenir) => set({ selectedSouvenir: souvenir }),
}))
