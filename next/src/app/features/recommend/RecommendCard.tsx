import {
  Card,
  CardBody,
  Heading,
  Stack,
  Flex,
  Text,
  HStack,
  Image,
} from '@chakra-ui/react'
import DataWithIcon from '@/components/molecules/DataWithIcon'
import Rating from '@/components/molecules/Rating'
import { SouvenirDetailType } from '@/types/types'

type RecommendCardProps = {
  souvenir: SouvenirDetailType
  rating: string | null
}

const RecommendCard = ({ souvenir, rating = '0' }: RecommendCardProps) => {
  return (
    <Card bg="white" cursor="pointer">
      <CardBody p={4}>
        <Stack spacing={4}>
          <Stack spacing={2}>
            <Heading size="md" maxH="2.4em" noOfLines={2}>
              {souvenir.name}
            </Heading>
            <HStack spacing={1}>
              <Text fontSize="xs">平均スコア：</Text>
              <Rating rating={Number(rating)} isSmall={false} />
            </HStack>
            <Flex aspectRatio="3/2" justifyContent="center" alignItems="center">
              <Image
                src={souvenir.image_url}
                alt={souvenir.name}
                borderRadius="sm"
                width="100%"
                aspectRatio="3/2"
                objectFit="cover"
                pointerEvents="none"
              />
            </Flex>
          </Stack>
          <DataWithIcon iconName="FaClipboardList">
            <Text fontSize="xs">
              {souvenir.category.parent ? souvenir.category.parent.name : ''} -{' '}
              {souvenir.category.name}
            </Text>
          </DataWithIcon>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default RecommendCard
