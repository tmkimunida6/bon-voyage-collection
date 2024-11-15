import { Container, Stack } from '@chakra-ui/react'
import { ReactNode } from 'react'
import Header from '../organisms/layout/Header'
import IntersectingNavFooter from '../organisms/layout/IntersectingNavFooter'
import { fetchFavoritedSouvenirs } from '@/utils/fetchFavoritedSouvenirs'
import { fetchUserState } from '@/utils/fetchUserState'
import GlobalStateSetter from '@/app/features/favorite/GlobalStateSetter'

export default async function DefaultTemplate({
  children,
}: {
  children: ReactNode
}) {
  const favoritedSouvenirsData = await fetchFavoritedSouvenirs()
  const userData = await fetchUserState()
  return (
    <>
      <GlobalStateSetter
        userData={userData}
        favoritedSouvenirsData={favoritedSouvenirsData}
      />
      <Stack spacing={0} minH="100dvh">
        <Header user={userData} />
        <Container flex={1} p={6}>
          {children}
        </Container>
        <IntersectingNavFooter />
      </Stack>
    </>
  )
}
