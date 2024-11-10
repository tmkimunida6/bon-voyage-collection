import {
  Card,
  CardBody,
  Heading,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
  LinkOverlay,
  LinkBox,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import CustomIcon from '../../atoms/CustomIcon'
import DataWithIcon from '../../molecules/DataWithIcon'
import Rating from '../../molecules/Rating'
import { SouvenirCardType } from '@/types/types'

type SouvenirCardProps = {
  size: 'sm' | 'md' | 'lg'
  isFavoritable: boolean
  souvenir: SouvenirCardType
  rating?: string | null
}

const SouvenirCard = ({
  size,
  isFavoritable,
  souvenir,
  rating = '0',
}: SouvenirCardProps) => {
  const cardStyles = {
    sm: {
      boxShadow: '0 0 15px rgba(0,0,0,0.25)',
    },
    md: {
      border: '1px',
      borderColor: 'brand.primary',
      width: '160px',
      height: '100%',
    },
    lg: {
      border: '1px',
      borderColor: 'brand.primary',
    },
  }

  return (
    <LinkBox>
      <Card {...cardStyles[size]}>
        <CardBody p={size === 'lg' ? 2 : 1}>
          <Stack spacing={2}>
            <Image
              src={souvenir.image_url}
              alt={souvenir.name}
              borderRadius="lg"
            />
            <LinkOverlay as={NextLink} href={`/souvenir/${souvenir.alias_id}`}>
              <Heading size="xs" h="2.4em" noOfLines={2}>
                {souvenir.name}
              </Heading>
            </LinkOverlay>
            <Rating rating={Number(rating)} isSmall={size === 'sm'} />
            {size !== 'sm' && (
              <HStack>
                {size === 'lg' ? (
                  <>
                    <DataWithIcon iconName="FaGift">
                      <Text size="xs" fontWeight="bold">
                        100
                      </Text>
                    </DataWithIcon>
                    <DataWithIcon iconName="FaBookmark">
                      <Text size="xs" fontWeight="bold">
                        100
                      </Text>
                    </DataWithIcon>
                  </>
                ) : (
                  <>
                    <DataWithIcon iconName="FaRegComment">
                      <Text size="xs" fontWeight="bold">
                        100
                      </Text>
                    </DataWithIcon>
                    <DataWithIcon iconName="FaRegHeart">
                      <Text size="xs" fontWeight="bold">
                        100
                      </Text>
                    </DataWithIcon>
                  </>
                )}
              </HStack>
            )}
          </Stack>
        </CardBody>
        {size === 'lg' && isFavoritable && (
          <IconButton
            aria-label="Search database"
            icon={<CustomIcon iconName="FaRegBookmark" color="brand.primary" />}
            variant="ghost"
            position="absolute"
            top={2}
            right={2}
            height={6}
            minWidth={6}
            _hover={{ backgroundColor: 'none' }}
          />
        )}
      </Card>
    </LinkBox>
  )
}

export default SouvenirCard
