import { Heading, HStack, Stack } from '@chakra-ui/react'
import SouvenirSearchResult from '@/components/organisms/Souvenir/SouvenirSearchResult'
import SearchForm from '@/components/organisms/form/SearchForm'

type SearchParamsProps = {
  searchParams?: {
    page?: string
    word?: string
    category_id?: number | ''
    category_name?: string
  }
}

export default async function Search({ searchParams }: SearchParamsProps) {
  const word = searchParams?.word || ''
  const category_id = searchParams?.category_id || ''
  return (
    <Stack spacing={6}>
      <HStack mb={6}>
        <Heading as="h1">検索</Heading>
      </HStack>
      <SearchForm />
      <SouvenirSearchResult word={word} category_id={category_id} />
    </Stack>
  )
}
