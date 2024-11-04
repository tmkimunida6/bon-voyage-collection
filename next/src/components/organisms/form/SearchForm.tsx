'use client'

import {
  Button,
  FormControl,
  HStack,
  Input,
  Stack,
  VStack,
} from '@chakra-ui/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import CategoryInput from '@/app/features/category/CategoryInput'
import { useCategoryStore } from '@/store/store'

const SearchForm = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [word, setWord] = useState<string>(searchParams.get('word') || '')
  const { selectedCategory } = useCategoryStore()

  const handleSearch = (
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
  }

  return (
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
        >
          検索する
        </Button>
      </VStack>
    </Stack>
  )
}

export default SearchForm
