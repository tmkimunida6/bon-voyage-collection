import { Container, Stack } from '@chakra-ui/react'
import { ReactNode } from 'react'
import Header from '../organisms/layout/Header'
import IntersectingNavFooter from '../organisms/layout/IntersectingNavFooter'
import FavoriteSouvenirsSetter from '@/app/features/favorite/FavoriteSouvenirsSetter'
import { fetchFavoritedSouvenirs } from '@/utils/fetchFavoritedSouvenirs'

export default async function DefaultTemplate({
  children,
}: {
  children: ReactNode
}) {
  const favoritedSouvenirsData = await fetchFavoritedSouvenirs()
  return (
    <>
      <FavoriteSouvenirsSetter
        favoritedSouvenirsData={favoritedSouvenirsData}
      />
      <Stack spacing={0} minH="100dvh">
        <Header />
        <Container flex={1} p={6}>
          {children}
        </Container>
        <IntersectingNavFooter />
      </Stack>
    </>
  )
}
