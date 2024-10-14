'use client'

import type { NextPage } from 'next'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'

const Test: NextPage = () => {
  const url = 'http://localhost:3001/api/v1/health_check'
  const { data, error } = useSWR(url, fetcher)

  if (error) return <div>An error has occurred.</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <div>Rails疎通テスト</div>
      <h1>レスポンス：{data.message}</h1>
    </>
  )
}

export default Test
