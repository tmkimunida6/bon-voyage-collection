import { Box } from '@chakra-ui/react'
import { redirect } from 'next/navigation'
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

  const apiKey = process.env.GOOGLE_MAP_API_KEY
  const mapId = process.env.GOOGLE_MAP_MAP_ID
  if (!apiKey || !mapId) {
    redirect('/?status=server_error')
  }

  return (
    <Box w="100vw" mx="calc(50% - 50vw)" my={{ base: -8, md: -12 }}>
      <EmbedMap posts={posts} placeId={placeId} apiKey={apiKey} mapId={mapId} />
    </Box>
  )
}
