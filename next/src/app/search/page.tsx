import { Heading, HStack, Stack } from '@chakra-ui/react'
import SearchForm from '@/components/organisms/form/SearchForm'
import SouvenirSearchResult from '../features/search/SouvenirSearchResult'

type SearchParamsProps = {
  searchParams?: {
    page?: string
    word?: string
    category_id?: string
    category_name?: string
  }
}

export default async function Search({ searchParams }: SearchParamsProps) {
  const word = searchParams?.word || ''
  const category_id = searchParams?.category_id || ''
  const hasNoParams = !searchParams || Object.keys(searchParams).length === 0
  console.log(hasNoParams)

  return (
    <Stack spacing={6}>
      <HStack mb={6}>
        <Heading as="h1">検索</Heading>
      </HStack>
      <SearchForm />
      {!hasNoParams && (
        <SouvenirSearchResult word={word} category_id={category_id} />
      )}
    </Stack>
  )
}
