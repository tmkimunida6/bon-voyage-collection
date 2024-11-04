import { Stack, Text } from '@chakra-ui/react'
import TextIconLink from '@/components/molecules/TextIconLink'
import SouvenirCard from '@/components/organisms/Souvenir/SouvenirCard'
import SouvenirCardList from '@/components/organisms/Souvenir/SouvenirCardList'
import { SouvenirType } from '@/types/types'

type SouvenirSearchResultProps = {
  souvenirs: Array<SouvenirType>
}

export default function SouvenirSearchResult({
  souvenirs,
}: SouvenirSearchResultProps) {
  return (
    <>
      {souvenirs ? (
        <SouvenirCardList
          size="lg"
          renderItem={(size) => (
            <>
              {souvenirs.map((souvenir: SouvenirType) => (
                <SouvenirCard
                  key={souvenir.id}
                  size={size}
                  isFavoritable={true}
                  souvenir={souvenir}
                />
              ))}
            </>
          )}
        />
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
