'use client'

import {
  Button,
  FormControl,
  HStack,
  Input,
  Text,
  Flex,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import CategoryInput from '@/app/features/category/CategoryInput'
import TextIconLink from '@/components/molecules/TextIconLink'
import { useCategoryStore } from '@/store/index'
import { CategoryType } from '@/types/types'

const TopSearchForm = () => {
  const [word, setWord] = useState<string>('')
  const { selectedCategory } = useCategoryStore()

  const handleLinkRecommendPage = (
    word: string,
    selectedCategory: CategoryType,
  ) => {
    window.location.href = `./recommend?word=${word}&category_id=${selectedCategory.id}&category_name=${selectedCategory.name}` // 完全なリロード
  }

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
        onClick={() => handleLinkRecommendPage(word, selectedCategory)}
      >
        お土産を見つける
      </Button>
      <VStack spacing={0}>
        <Text fontSize="sm">すでにアカウントをお持ちですか？</Text>
        <Flex justifyContent="center" fontWeight="bold">
          <TextIconLink
            iconName="FaSignInAlt"
            iconPosition="left"
            href="./sign_in"
          >
            ログイン
          </TextIconLink>
        </Flex>
      </VStack>
    </>
  )
}

export default TopSearchForm
