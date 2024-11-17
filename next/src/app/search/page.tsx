import { Heading, HStack, Stack } from '@chakra-ui/react'
import SearchForm from '@/components/organisms/form/SearchForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '検索 | Bon Voyage Collcection',
  description: 'ユーザーが登録したお土産を検索しましょう。見つからなければ自分で追加することも可能です。',
  keywords: 'お土産,Souvenir,お土産検索,発見,Bon Voyage Collection'
}

const Search = () => {
  return (
    <Stack spacing={6} maxW="660px" mx="auto">
      <HStack mb={6}>
        <Heading as="h1">検索</Heading>
      </HStack>
      <SearchForm page="search" />
    </Stack>
  )
}

export default Search
