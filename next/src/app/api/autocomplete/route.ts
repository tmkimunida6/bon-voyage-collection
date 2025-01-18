import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('query')
  const sessionToken = searchParams.get('sessiontoken')

  if (!query) {
    return NextResponse.json({ predictions: [] })
  }

  const apiKey = process.env.GOOGLE_MAP_API_KEY
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    query,
  )}&key=${apiKey}&sessiontoken=${sessionToken}&types=establishment&language=ja`

  const res = await fetch(url)
  const data = await res.json()

  return NextResponse.json(data)
}
