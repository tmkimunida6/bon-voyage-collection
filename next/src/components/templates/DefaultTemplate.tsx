import { Container, Stack } from '@chakra-ui/react'
import { ReactNode } from 'react'
import Header from '../organisms/layout/Header'
import IntersectingNavFooter from '../organisms/layout/IntersectingNavFooter'
import GlobalStateSetter from '@/app/features/favorite/GlobalStateSetter'
import { fetchFavoritedSouvenirs } from '@/utils/fetchFavoritedSouvenirs'
import { fetchPostDataByUser } from '@/utils/fetchPostDataByUser'
import { fetchUserState } from '@/utils/fetchUserState'

export default async function DefaultTemplate({
  children,
}: {
  children: ReactNode
}) {
  const favoritedSouvenirsData = await fetchFavoritedSouvenirs()
  const myPostsData = await fetchPostDataByUser()
  const userData = await fetchUserState()
  return (
    <>
      <GlobalStateSetter
        userData={userData}
        favoritedSouvenirsData={favoritedSouvenirsData}
        myPostsData={myPostsData}
      />
      <Stack spacing={0} minH="100dvh">
        <Header user={userData} />
        <Container flex={1} maxW="1200px" p={{ base: 4, sm: 6, lg: 12 }}>
          {children}
        </Container>
        <IntersectingNavFooter />
      </Stack>
    </>
  )
}
