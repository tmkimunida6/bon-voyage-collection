'use client'

import { Button, FormControl, Heading, HStack, Input, Stack, VStack } from '@chakra-ui/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import CategoryInput from '@/app/features/category/CategoryInput'

const SearchForm = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [word, setWord] = useState<string>(searchParams.get('word') || '')
  // const [searchCategory, setCategory] = useState(
  //   searchParams.get('category') || '',
  // )

  const handleSearch = (word: string) => {
    const urlParams = new URLSearchParams(searchParams)
    urlParams.set('page', '1')
    if (word) {
      urlParams.set('word', word)
    } else {
      urlParams.delete('word')
    }
    // if (category) {
    //   params.set('category', category)
    // } else {
    //   params.delete('category')
    // }
    replace(`${pathname}?${urlParams.toString()}`)
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
        <Button variant='primary' onClick={() => handleSearch(word)}>検索する</Button>
      </VStack>
    </Stack>
  )
}

export default SearchForm
