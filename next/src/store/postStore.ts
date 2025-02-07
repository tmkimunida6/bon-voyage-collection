import { create } from 'zustand'
import { PostType } from '@/types/types'

// 自分の投稿
type MyPostsState = {
  myPosts: Array<PostType>
  setMyPosts: (posts: Array<PostType>) => void
}

export const useMyPostsStore = create<MyPostsState>((set) => ({
  myPosts: [],
  setMyPosts: (posts) => set({ myPosts: posts }),
}))
