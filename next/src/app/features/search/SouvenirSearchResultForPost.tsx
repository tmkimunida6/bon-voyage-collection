import {
  Button,
  Card,
  CardBody,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import TextIconLink from '@/components/molecules/TextIconLink'
import { useSouvenirStore } from '@/store/store'
import { SouvenirSelectType, SouvenirCardType } from '@/types/types'

type SouvenirSearchResultForPostProps = {
  souvenirs: Array<SouvenirCardType> | null
}

export default function SouvenirSearchResultForPost({
  souvenirs,
}: SouvenirSearchResultForPostProps) {
  const { selectedSouvenir, setSelectedSouvenir } = useSouvenirStore()

  if (!souvenirs) return

  const onSelectSouvenir = (souvenir: SouvenirSelectType) => {
    if (souvenir.alias_id === selectedSouvenir.alias_id) {
      setSelectedSouvenir({ alias_id: '', name: '' })
    } else {
      setSelectedSouvenir({ alias_id: souvenir.alias_id, name: souvenir.name })
    }
  }
  return (
    <>
      {souvenirs.length ? (
        <SimpleGrid
          spacing={2}
          templateColumns="repeat(auto-fill, minmax(120px, 1fr))"
        >
          {souvenirs.map((souvenir) => (
            <Button
              key={souvenir.alias_id}
              variant="ghost"
              w="100%"
              h="100%"
              p={0}
              whiteSpace="normal"
              onClick={() =>
                onSelectSouvenir({
                  alias_id: souvenir.alias_id,
                  name: souvenir.name,
                })
              }
            >
              <Card
                h="100%"
                boxShadow="none"
                border="1px"
                borderColor={
                  souvenir.alias_id === selectedSouvenir.alias_id
                    ? 'brand.primary'
                    : 'brand.secondary'
                }
                bg={
                  souvenir.alias_id === selectedSouvenir.alias_id
                    ? 'brand.primary'
                    : 'white'
                }
                transition="all 0.3s"
              >
                <CardBody p={1}>
                  <Stack spacing={2}>
                    <Image
                      src={souvenir.image_url}
                      alt={souvenir.name}
                      borderRadius="lg"
                      width="100%"
                      aspectRatio="3/2"
                      objectFit="contain"
                    />
                    <Heading size="xs" lineHeight="1.5" noOfLines={2}>
                      {souvenir.name}
                    </Heading>
                  </Stack>
                </CardBody>
              </Card>
            </Button>
          ))}
        </SimpleGrid>
      ) : (
        <Stack spacing={4}>
          <Text>条件に一致するお土産が見つかりませんでした。</Text>
          <TextIconLink
            iconName="FaPen"
            iconPosition="left"
            href="/souvenir/new"
          >
            お土産の新規登録を行う
          </TextIconLink>
        </Stack>
      )}
    </>
  )
}
