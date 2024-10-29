import { SimpleGrid } from '@chakra-ui/react'
import { ReactElement } from 'react'

type SouvenirCardListProps = {
  size: 'sm' | 'lg'
  renderItem: (size: 'sm' | 'lg') => ReactElement
}

const SouvenirCardList = ({ size, renderItem }: SouvenirCardListProps) => {
  return (
    <SimpleGrid
      spacing={size === 'lg' ? 4 : 2}
      templateColumns={
        size === 'lg'
          ? 'repeat(auto-fill, minmax(172px, 1fr))'
          : 'repeat(auto-fill, minmax(115px, 1fr))'
      }
    >
      {renderItem(size)}
    </SimpleGrid>
  )
}

export default SouvenirCardList
