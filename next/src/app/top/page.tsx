import { Button } from '@chakra-ui/react'
import type { NextPage } from 'next'
import TextIconLink from '../components/molecules/TextIconLink'
import SouvenirCardList from '../components/organisms/souvenir/SouvenirCardList'
import SouvenirCard from '../components/organisms/souvenir/SouvenirCard'

const Top: NextPage = () => {
  return (
    <>
      <h1>Top</h1>
      <Button variant="primary">おすすめのお土産をみる</Button>
      <TextIconLink iconName="FaPenSquare" iconPosition='left' href="#">編集する</TextIconLink>
      <SouvenirCardList 
        size='lg'
        renderItem={(size) => (
          <>
            <SouvenirCard size={size} isFavoritable={true} />
            <SouvenirCard size={size} isFavoritable={true}/>
            <SouvenirCard size={size} isFavoritable={true} />
          </>
        )}
      />
    </>
  )
}

export default Top
