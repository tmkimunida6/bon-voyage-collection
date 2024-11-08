import { HStack, IconButton, Text } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'
import CustomIcon from '../atoms/CustomIcon'

type PaginationProps = {
  currentPage: number
  totalPages: number
  nextPage: number | null
  prevPage: number | null
  handleSearch: (
    currentPage: number,
    word: string | '',
    category_id: number | '',
    category_name: string,
  ) => void
}

const Pagination = ({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
  handleSearch,
}: PaginationProps) => {
  const searchParams = useSearchParams()

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    const word = params.get('word') || ''
    const category_id = Number(params.get('category_id')) || ''
    const category_name = params.get('category_name') || ''

    handleSearch(page, word, category_id, category_name)
  }
  return (
    <HStack spacing={4} justify="center" mt={4}>
      <IconButton
        icon={<CustomIcon iconName="FaChevronLeft" />}
        aria-label="前へ"
        onClick={() => prevPage && handlePageChange(prevPage)}
        isDisabled={!prevPage}
      />
      <Text>
        Page {currentPage} / {totalPages}
      </Text>
      <IconButton
        icon={<CustomIcon iconName="FaChevronRight" />}
        aria-label="次へ"
        onClick={() => nextPage && handlePageChange(nextPage)}
        isDisabled={!nextPage}
      />
    </HStack>
  )
}

export default Pagination
