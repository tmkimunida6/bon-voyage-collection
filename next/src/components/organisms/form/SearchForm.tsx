/* eslint @typescript-eslint/no-explicit-any: 0 */

'use client'

import {
  Button,
  FormControl,
  HStack,
  IconButton,
  Input,
  Spinner,
  Stack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import CategoryInput from '@/app/features/category/CategoryInput'
import SouvenirSearchResult from '@/app/features/search/SouvenirSearchResult'
import CustomIcon from '@/components/atoms/CustomIcon'
import { useCategoryStore } from '@/store/store'
import { SouvenirType } from '@/types/types'
import { searchSouvenirData } from '@/utils/searchSouvenirData'

const SearchForm = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const [word, setWord] = useState<string>(searchParams.get('word') || '')
  const [searchResult, setSearchResult] = useState<{
    souvenirs: Array<SouvenirType>
    total_pages: number
  }>({ souvenirs: [], total_pages: 1 })
  const [loading, setLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState(1)
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    handleSearch(page, word, selectedCategory.id, selectedCategory.name)
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
              handleSearch(
                currentPage,
                word,
                selectedCategory.id,
                selectedCategory.name,
              )
            }
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
          <SouvenirSearchResult souvenirs={searchResult.souvenirs} />
          {searchResult.total_pages > 1 && (
            <HStack spacing={4} justify="center" mt={4}>
              <IconButton
                icon={<CustomIcon iconName="FaChevronLeft" />}
                aria-label="Previous Page"
                onClick={() => handlePageChange(currentPage - 1)}
                isDisabled={currentPage === 1}
              />
              <Text>
                Page {currentPage} / {searchResult.total_pages}
              </Text>
              <IconButton
                icon={<CustomIcon iconName="FaChevronRight" />}
                aria-label="Next Page"
                onClick={() => handlePageChange(currentPage + 1)}
                isDisabled={currentPage === searchResult.total_pages}
              />
            </HStack>
          )}
        </>
      )}
    </>
  )
}

export default SearchForm