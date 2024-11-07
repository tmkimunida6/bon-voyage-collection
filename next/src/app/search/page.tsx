import { Heading, HStack, Stack } from '@chakra-ui/react'
import SearchForm from '@/components/organisms/form/SearchForm'

const Search = () => {
  return (
    <Stack spacing={6}>
      <HStack mb={6}>
        <Heading as="h1">検索</Heading>
      </HStack>
      <SearchForm page="search" />
    </Stack>
  )
}

export default Search
