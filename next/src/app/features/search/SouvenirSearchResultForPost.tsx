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
import { SouvenirCardType, SouvenirType } from '@/types/types'

type SouvenirSearchResultForPostProps = {
  souvenirs: Array<SouvenirType> | null
}

export default function SouvenirSearchResultForPost({
  souvenirs,
}: SouvenirSearchResultForPostProps) {
  const { selectedSouvenir, setSelectedSouvenir } = useSouvenirStore()

  if (!souvenirs) return

  const onSelectSouvenir = (souvenir: SouvenirCardType) => {
    setSelectedSouvenir(souvenir)
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
              key={souvenir.id}
              variant="ghost"
              w="100%"
              h="100%"
              p={0}
              whiteSpace="normal"
              sx={{
                '&:disabled': {
                  opacity: 1,
                },
              }}
              onClick={() =>
                onSelectSouvenir({ id: souvenir.id, name: souvenir.name })
              }
              disabled={souvenir.id === selectedSouvenir.id}
            >
              <Card
                h="100%"
                boxShadow="none"
                border="1px"
                borderColor={
                  souvenir.id === selectedSouvenir.id
                    ? 'brand.primary'
                    : 'brand.secondary'
                }
                bg={
                  souvenir.id === selectedSouvenir.id
                    ? 'brand.primary'
                    : 'white'
                }
              >
                <CardBody p={1}>
                  <Stack spacing={2}>
                    <Image
                      src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                      alt={souvenir.name}
                      borderRadius="lg"
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
