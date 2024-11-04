import SouvenirCard from './SouvenirCard'
import { SouvenirType } from '@/types/types'
import { searchSouvenirData } from '@/utils/searchSouvenirData'
import SouvenirCardList from './SouvenirCardList'

type SouvenirSearchResultProps = {
  word: string
}

export default async function SouvenirSearchResult({
  word,
}: SouvenirSearchResultProps) {
  const souvenirs = await searchSouvenirData(word)
  return (
    <>
      {souvenirs && (
        <SouvenirCardList size="lg" renderItem={(size) => (
            <>
              {souvenirs.map((souvenir: SouvenirType) => (
                <SouvenirCard key={souvenir.id} size={size} isFavoritable={true} souvenir={souvenir} />
              ))}
            </>
          )}
        />
      )}
    </>
  )
}
