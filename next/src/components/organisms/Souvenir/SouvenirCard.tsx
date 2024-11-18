import {
  Card,
  CardBody,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  LinkOverlay,
  LinkBox,
  Flex,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import DataWithIcon from '../../molecules/DataWithIcon'
import Rating from '../../molecules/Rating'
import FavoriteButton from '@/app/features/favorite/FavoriteButton'
import FavoriteTrashButton from '@/app/features/favorite/FavoriteTrashButton'
import { SouvenirCardType } from '@/types/types'

type SouvenirCardProps = {
  size: 'sm' | 'md' | 'lg'
  isFavoritable: boolean
  souvenir: SouvenirCardType
  rating: string | null
  hasTrashIcon?: boolean
}

const SouvenirCard = ({
  size,
  isFavoritable,
  souvenir,
  rating = '0',
  hasTrashIcon = false,
}: SouvenirCardProps) => {
  const cardStyles = {
    sm: {
      boxShadow: '0 0 15px rgba(0,0,0,0.25)',
    },
    md: {
      border: '1px',
      borderColor: 'brand.primary',
    },
    lg: {
      border: '1px',
      borderColor: 'brand.primary',
    },
  }

  return (
    <LinkBox
      transition="all 0.3s"
      borderRadius= "4px"
      h="100%"
      sx ={{
        _hover: { boxShadow: '0 0 15px rgba(0,0,0,0.25)' }
      }}
    >
      <Card {...cardStyles[size]} height="100%">
        <CardBody p={2} height="100%">
          <Stack justifyContent="space-between" height="100%" spacing={2}>
            <Stack spacing={2}>
              <Flex
                aspectRatio="3/2"
                justifyContent="center"
                alignItems="center"
              >
                <Image
                  src={souvenir.image_url}
                  alt={souvenir.name}
                  borderRadius="lg"
                  width="100%"
                  aspectRatio="3/2"
                  objectFit="contain"
                />
              </Flex>
              <LinkOverlay
                as={NextLink}
                href={`/souvenir/${souvenir.alias_id}`}
              >
                <Heading size="xs" maxH="2.4em" noOfLines={2}>
                  {souvenir.name}
                </Heading>
              </LinkOverlay>
            </Stack>
            <Stack spacing={1}>
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
          </Stack>
        </CardBody>
        {size === 'lg' && isFavoritable && (
          <FavoriteButton
            currentSouvenir={souvenir}
            isIconButton={true}
            position="absolute"
          />
        )}
        {hasTrashIcon && <FavoriteTrashButton currentSouvenir={souvenir} />}
      </Card>
    </LinkBox>
  )
}

export default SouvenirCard
