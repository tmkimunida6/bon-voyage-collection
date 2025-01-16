import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('query')

  if (!query || query.length < 3) {
    return NextResponse.json({ predictions: [] })
  }

  const apiKey = process.env.GOOGLE_MAP_API_KEY
  console.log(apiKey)
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    query,
  )}&key=${apiKey}&types=establishment`

  const res = await fetch(url)
  const data = await res.json()

  return NextResponse.json(data)
}
