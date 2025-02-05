import { create } from 'zustand'
import { CurrentUserType } from '@/types/types'

// ログイン中ユーザー
type CurrentUserState = {
  currentUser: CurrentUserType | null
  setCurrentUser: (user: CurrentUserType) => void
}

export const useCurrentUserStore = create<CurrentUserState>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
}))
