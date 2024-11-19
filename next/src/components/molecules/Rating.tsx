import { Flex, HStack } from '@chakra-ui/react'
import CustomIcon from '../atoms/CustomIcon'

type RatingProps = {
  rating: number
  isSmall?: boolean
}

const Rating = ({ rating, isSmall }: RatingProps) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const emptyStars = 5 - Math.ceil(rating)

  return (
    <HStack gap="2px">
      {[...Array(fullStars)].map((_, index) => (
        <CustomIcon
          key={index}
          iconName="FaStar"
          color="brand.star"
          fontSize={isSmall ? 'xs' : 'sm'}
        />
      ))}
      {hasHalfStar && (
        <Flex position="relative" height={isSmall ? '12px' : '14px'}>
          <CustomIcon
            iconName="FaStar"
            color="gray.300"
            fontSize={isSmall ? 'xs' : 'sm'}
          />
          <Flex
            position="absolute"
            top="0"
            left="0"
            width={`${(rating - fullStars) * 100}%`}
            height="100%"
            overflow="hidden"
          >
            <CustomIcon
              iconName="FaStar"
              color="brand.star"
              fontSize={isSmall ? 'xs' : 'sm'}
            />
          </Flex>
        </Flex>
      )}
      {[...Array(emptyStars)].map((_, index) => (
        <CustomIcon
          key={index}
          iconName="FaStar"
          color="gray.300"
          fontSize={isSmall ? 'xs' : 'sm'}
        />
      ))}
    </HStack>
  )
}

export default Rating
