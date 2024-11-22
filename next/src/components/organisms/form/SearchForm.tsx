/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint react-hooks/exhaustive-deps: 0 */

'use client'

import {
  Button,
  FormControl,
  HStack,
  Input,
  Spinner,
  Stack,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import CategoryInput from '@/app/features/category/CategoryInput'
import SouvenirSearchResult from '@/app/features/search/SouvenirSearchResult'
import SouvenirSearchResultForPost from '@/app/features/search/SouvenirSearchResultForPost'
import Pagination from '@/components/molecules/Pagination'
import useSearchSouvenir from '@/hooks/useSearchSouvenir'
import { useCategoryStore } from '@/store/store'

const SearchForm = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const [word, setWord] = useState<string>(searchParams.get('word') || '')
  const { selectedCategory } = useCategoryStore()

  // 検索結果取得hooks
  const { searchResult, loading, fetchSearchResult } = useSearchSouvenir()

  // TOPからの検索（URLのパラメータを元に検索）
  useEffect(() => {
    if (searchParams.size && pathname === '/search') {
      const page = Number(searchParams.get('page')) || 1
      const word = searchParams.get('word') || ''
      const category_id = searchParams.get('category_id') || ''
      fetchSearchResult(page, word, category_id)
    }
  }, [searchParams])

  // 検索ボタン押下による検索
  const handleSearch = async (
    currentPage: number,
    word: string | '',
    category_id: number | '',
    category_name: string | '',
  ) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', currentPage.toString())
    if (word) {
      params.set('word', word)
    } else {
      params.delete('word')
    }
    if (selectedCategory.id) {
      params.set('category_id', category_id.toString())
      params.set('category_name', category_name.toString())
    } else {
      params.delete('category_id')
      params.delete('category_name')
    }
    replace(`${pathname}?${params.toString()}`)

    fetchSearchResult(currentPage, word, category_id.toString())
  }

  // ページネーション
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    const word = params.get('word') || ''
    const category_id = Number(params.get('category_id')) || ''
    const category_name = params.get('category_name') || ''

    handleSearch(page, word, category_id, category_name)
  }

  // 検索結果だしわけ
  let resultUI
  switch (pathname) {
    case '/search':
      resultUI = <SouvenirSearchResult souvenirs={searchResult.souvenirs} />
      break
    case '/post':
      resultUI = (
        <SouvenirSearchResultForPost souvenirs={searchResult.souvenirs} />
      )
      break
    default:
      resultUI = <SouvenirSearchResult souvenirs={searchResult.souvenirs} />
      break
  }

  return (
    <>
      <Stack spacing={6} mb={6}>
        <HStack>
          <FormControl>
            <Input
              type="text"
              placeholder="フリーワード"
              onChange={(e) => setWord(e.target.value)}
              defaultValue={word}
            />
          </FormControl>
          <FormControl>
            <CategoryInput />
          </FormControl>
        </HStack>
        <VStack>
          <Button
            variant="primary"
            onClick={() => {
              handleSearch(1, word, selectedCategory.id, selectedCategory.name)
            }}
            pointerEvents={loading ? 'none' : 'auto'}
          >
            検索する
          </Button>
        </VStack>
      </Stack>
      {loading ? (
        <VStack py={6}>
          <Spinner color="brand.primary" size="lg" thickness="3px" />
        </VStack>
      ) : (
        <>
          {resultUI}
          {searchResult.pages.total_pages > 1 && (
            <Pagination
              currentPage={searchResult.pages.current_page}
              totalPages={searchResult.pages.total_pages}
              nextPage={searchResult.pages.next_page}
              prevPage={searchResult.pages.prev_page}
              handlePageChange={handlePageChange}
            />
          )}
        </>
      )}
    </>
  )
}

export default SearchForm
