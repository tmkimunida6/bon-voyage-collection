import { Stack, Text } from '@chakra-ui/react'
import TextIconLink from '@/components/molecules/TextIconLink'
import SouvenirCard from '@/components/organisms/Souvenir/SouvenirCard'
import SouvenirCardList from '@/components/organisms/Souvenir/SouvenirCardList'
import { SouvenirType } from '@/types/types'

type SouvenirSearchResultProps = {
  souvenirs: Array<SouvenirType> | null
}

export default function SouvenirSearchResult({
  souvenirs,
}: SouvenirSearchResultProps) {
  if (!souvenirs) return

  return (
    <>
      {souvenirs.length ? (
        <SouvenirCardList
          size="sm"
          renderItem={(size) => (
            <>
              {souvenirs.map((souvenir: SouvenirType) => (
                <SouvenirCard
                  key={souvenir.alias_id}
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
