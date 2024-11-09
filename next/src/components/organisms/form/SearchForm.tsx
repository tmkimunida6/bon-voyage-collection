/* eslint @typescript-eslint/no-explicit-any: 0 */

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
import { useState } from 'react'
import CategoryInput from '@/app/features/category/CategoryInput'
import SouvenirSearchResult from '@/app/features/search/SouvenirSearchResult'
import SouvenirSearchResultForPost from '@/app/features/search/SouvenirSearchResultForPost'
import Pagination from '@/components/molecules/Pagination'
import { useCategoryStore } from '@/store/store'
import { PagesType, SouvenirType } from '@/types/types'
import { searchSouvenirData } from '@/utils/searchSouvenirData'

type SearchFormProps = {
  page: 'search' | 'post'
}

const SearchForm = ({ page }: SearchFormProps) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const [word, setWord] = useState<string>(searchParams.get('word') || '')
  const [searchResult, setSearchResult] = useState<{
    souvenirs: Array<SouvenirType> | null
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
  const [loading, setLoading] = useState<boolean>(false)
  const { selectedCategory } = useCategoryStore()

  const toast = useToast()

  const handleSearch = async (
    currentPage: number,
    word: string | '',
    category_id: number | '',
    category_name: string,
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

    try {
      setLoading(true)
      const searchResult = await searchSouvenirData(
        currentPage,
        word,
        category_id.toString(),
      )
      setSearchResult(searchResult)
    } catch (error: any) {
      toast({
        title: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
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
  switch (page) {
    case 'search':
      resultUI = <SouvenirSearchResult souvenirs={searchResult.souvenirs} />
      break
    case 'post':
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
