import { HStack, IconButton, Text } from '@chakra-ui/react'
import CustomIcon from '../atoms/CustomIcon'

type PaginationProps = {
  currentPage: number
  totalPages: number
  nextPage: number | null
  prevPage: number | null
  handlePageChange: (page: number) => void
}

const Pagination = ({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
  handlePageChange,
}: PaginationProps) => {
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
        bg="gray.200"
      />
    </HStack>
  )
}

export default Pagination
