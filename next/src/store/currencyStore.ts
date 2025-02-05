import { create } from 'zustand'

// 通貨選択
type CurrencyState = {
  selectedCurrency: string
  setSelectedCurrency: (currency: string) => void
}

export const useCurrencyStore = create<CurrencyState>((set) => ({
  selectedCurrency: 'JPY',
  setSelectedCurrency: (currency) => set({ selectedCurrency: currency }),
}))
