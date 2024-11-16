import { SimpleGrid } from '@chakra-ui/react'
import { ReactElement } from 'react'

type SouvenirCardListProps = {
  size: 'sm' | 'md' | 'lg'
  renderItem: (size: 'sm' | 'md' | 'lg') => ReactElement
}

const SouvenirCardList = ({ size, renderItem }: SouvenirCardListProps) => {
  const gridStyles = {
    sm: {
      templateColumns: 'repeat(auto-fill, minmax(115px, 1fr))',
      spacing: 2,
    },
    md: {
      templateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: '16px 8px'
    },
    lg: {
      templateColumns: 'repeat(auto-fill, minmax(172px, 1fr))',
      spacing: 4,
    },
  }

  return <SimpleGrid {...gridStyles[size]}>{renderItem(size)}</SimpleGrid>
}

export default SouvenirCardList
