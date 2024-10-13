import { border, Button, Card, CardBody, Heading, HStack, IconButton, Image, Stack, Text } from '@chakra-ui/react'
import Rating from '../../molecules/Rating';
import DataWithIcon from '../../molecules/DataWithIcon';
import CustomIcon from '../../atoms/CustomIcon';

type SouvenirCardProps = {
  size: 'sm' | 'lg',
  isFavoritable: boolean
}

const SouvenirCard = ({ size, isFavoritable }: SouvenirCardProps) => {
  const cardStyles = {
    sm: {
      boxShadow: '0 0 15px rgba(0,0,0,0.25)',
    },
    lg: {
      border: '1px',
      borderColor: 'brand.primary',
    }
  }

  return (
    <Card {...cardStyles[size]} >
      <CardBody p={size === 'lg' ? 2 : 1}>
        <Stack spacing={2}>
          <Image
            src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
            alt='Green double couch with wooden legs'
            borderRadius='lg'
          />
          <Heading size='xs'>ハワイアンホースト マカデミアナッツチョコレート</Heading>
          <Rating rate={3.4}/>
          <HStack>
            {
              size === 'lg' ? (
                <>
                  <DataWithIcon iconName='FaGift'>
                    <Text size='xs' fontWeight='bold'>100</Text>
                  </DataWithIcon>
                  <DataWithIcon iconName='FaBookmark'>
                    <Text size='xs' fontWeight='bold'>100</Text>
                  </DataWithIcon>
                </>
              ) : (
                <>
                  <DataWithIcon iconName='FaRegComment'>
                    <Text size='xs' fontWeight='bold'>100</Text>
                  </DataWithIcon>
                  <DataWithIcon iconName='FaRegHeart'>
                    <Text size='xs' fontWeight='bold'>100</Text>
                  </DataWithIcon>
                </>
              )
            }
          </HStack>
        </Stack>
      </CardBody>
      {
        (size === 'lg' && isFavoritable) && (
          <IconButton 
            aria-label='Search database'
            icon={<CustomIcon iconName='FaRegBookmark' color='brand.primary' />}
            variant="ghost"
            position='absolute'
            top={2}
            right={2}
            height={6}
            minWidth={6}
            _hover={{ backgroundColor: 'none' }}
          />
        )
      }
    </Card>
  )
}

export default SouvenirCard;