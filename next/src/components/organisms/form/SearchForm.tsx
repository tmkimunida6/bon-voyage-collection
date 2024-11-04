/* eslint @typescript-eslint/no-explicit-any: 0 */

'use client'

import {
  Button,
  FormControl,
  HStack,
  Input,
  Stack,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import CategoryInput from '@/app/features/category/CategoryInput'
import SouvenirSearchResult from '@/app/features/search/SouvenirSearchResult'
import { useCategoryStore } from '@/store/store'
import { SouvenirType } from '@/types/types'
import { searchSouvenirData } from '@/utils/searchSouvenirData'

const SearchForm = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const [word, setWord] = useState<string>(searchParams.get('word') || '')
  const [searchResult, setSearchResult] = useState<Array<SouvenirType>>([])
  const [loading, setLoading] = useState<boolean>(false)
  const { selectedCategory } = useCategoryStore()

  const toast = useToast()

  const handleSearch = async (
    word: string,
    category_id: number | '',
    category_name: string,
  ) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')
    if (word) {
      params.set('word', word)
    } else {
      params.delete('word')
    }
    if (selectedCategory) {
      params.set('category_id', category_id.toString())
      params.set('category_name', category_name.toString())
    } else {
      params.delete('category_id')
      params.delete('category_name')
    }
    replace(`${pathname}?${params.toString()}`)

    try {
      setLoading(true)
      const souvenirs = await searchSouvenirData(word, category_id.toString())
      setSearchResult(souvenirs)
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

  return (
    <>
      <Stack spacing={6}>
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
            onClick={() =>
              handleSearch(word, selectedCategory.id, selectedCategory.name)
            }
            isLoading={loading}
          >
            検索する
          </Button>
        </VStack>
      </Stack>
      <SouvenirSearchResult souvenirs={searchResult} />
    </>
  )
}

export default SearchForm
