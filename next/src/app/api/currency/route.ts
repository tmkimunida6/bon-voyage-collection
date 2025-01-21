import { NextResponse } from 'next/server'

export async function GET() {
  const apiKey = process.env.OPEN_EXCHANGE_RATE_API_KEY
  const res = await fetch(
    `https://openexchangerates.org/api/currencies.json?app_id=${apiKey}`,
  )
  const data = await res.json()

  return NextResponse.json(data)
}
