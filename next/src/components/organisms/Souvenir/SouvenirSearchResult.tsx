import SouvenirCard from './SouvenirCard'
import { SouvenirType } from '@/types/types'
import { searchSouvenirData } from '@/utils/searchSouvenirData'
import SouvenirCardList from './SouvenirCardList'

type SouvenirSearchResultProps = {
  word: string
  category_id: number | ''
}

export default async function SouvenirSearchResult({
  word,
  category_id
}: SouvenirSearchResultProps) {
  const souvenirs = await searchSouvenirData(word, category_id)
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
