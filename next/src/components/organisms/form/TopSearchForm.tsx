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
import NextLink from 'next/link'
import { useState } from 'react'
import CategoryInput from '@/app/features/category/CategoryInput'
import TextIconLink from '@/components/molecules/TextIconLink'
import { useCategoryStore } from '@/store/index'

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
        href={`./recommend?word=${word}&category_id=${selectedCategory.id}&category_name=${selectedCategory.name}`}
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
