'use client'

import { Button, FormControl, HStack, Input } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useState } from 'react'
import CategoryInput from '@/app/features/category/CategoryInput'
import { useCategoryStore } from '@/store/store'

const TopSearchForm = () => {
  const [word, setWord] = useState<string>('')
  const { selectedCategory } = useCategoryStore()

  return (
    <>
      <HStack>
        <FormControl>
          <Input
            type="text"
            placeholder="フリーワード"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <CategoryInput />
        </FormControl>
      </HStack>
      <Button
        variant="primary"
        as={NextLink}
        href={`./search?page=1&word=${word}&category_id=${selectedCategory.id}&category_name=${selectedCategory.name}`}
      >
        お土産をみる
      </Button>
    </>
  )
}

export default TopSearchForm
