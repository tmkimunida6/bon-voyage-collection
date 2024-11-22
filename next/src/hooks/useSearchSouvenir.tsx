/* eslint @typescript-eslint/no-unused-vars: 0 */

import { useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { PagesType, SouvenirCardType } from '@/types/types'
import { searchSouvenirData } from '@/utils/searchSouvenirData'

const useSearchSouvenir = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [searchResult, setSearchResult] = useState<{
    souvenirs: Array<SouvenirCardType> | null
    pages: PagesType
  }>({
    souvenirs: null,
    pages: {
      current_page: 1,
      total_pages: 1,
      prev_page: null,
      next_page: null,
    },
  })
  const toast = useToast()

  const fetchSearchResult = async (
    page: number = 1,
    word: string,
    category_id: string,
  ) => {
    try {
      setLoading(true)
      const searchResult = await searchSouvenirData(page, word, category_id)
      setSearchResult(searchResult)
    } catch (error) {
      toast({
        title:
          'サーバーエラーが発生しました。時間をおいてから再度お試しください。',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    searchResult,
    loading,
    fetchSearchResult,
  }
}

export default useSearchSouvenir
