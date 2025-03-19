import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const placeId = searchParams.get('placeId')

  if (!placeId) {
    return NextResponse.json({})
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}&language=ja`

  const res = await fetch(url)
  const data = await res.json()

  return NextResponse.json(data)
}
