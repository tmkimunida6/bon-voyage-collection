import { Box, Flex, HStack } from '@chakra-ui/react'
import CustomIcon from '../atoms/CustomIcon'

type RatingProps = {
  rate: number
}

const Rating = ({ rate }: RatingProps) => {
  const fullStars = Math.floor(rate);
  const hasHalfStar = rate % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rate);

  return (
    <HStack gap='2px'>
      {
        [...Array(fullStars)].map((_, index) => (
          <CustomIcon key={index} iconName='FaStar' color='brand.star' />
        ))
      }
      {
        hasHalfStar && (
          <Flex position="relative" height='16px'>
            <CustomIcon iconName='FaStar' color='gray.300' />
            <Flex
              position="absolute"
              top="0"
              left="0"
              width={`${(rate - fullStars) * 100}%`}
              height="100%"
              overflow="hidden"
            >
              <CustomIcon iconName='FaStar' color='brand.star' />
            </Flex>
          </Flex>
        )
      }
      {
        [...Array(emptyStars)].map((_, index) => (
          <CustomIcon key={index} iconName='FaStar' color='brand.gray' />
        ))
      }
    </HStack>
  )
}

export default Rating;