import { Box } from '@chakra-ui/react'
import EmbedMap from '../features/map/EmbedMap'
import { fetchPostWithPlace } from '@/utils/fetchPostWithPlace'

type MapProps = {
  searchParams: {
    place_id: string
  }
}

export default async function Map({ searchParams }: MapProps) {
  const placeId = searchParams?.place_id || null
  const posts = await fetchPostWithPlace()

  return (
    <Box w="100vw" mx="calc(50% - 50vw)" my={{ base: -8, md: -12 }}>
      <EmbedMap posts={posts} placeId={placeId} />
    </Box>
  )
}
