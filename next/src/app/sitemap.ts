import { apiBaseUrl } from '@/constants/apiBaseUrl'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = process.env.NEXT_PUBLIC_FRONT_BASE_URL

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${url}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${url}/timeline`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1,
    },
    {
      url: `${url}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.1,
    },
    {
      url: `${url}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.1,
    },
  ]

  // APIから動的データを取得
  let souvenirs = []
  try {
    const response = await fetch(`${apiBaseUrl}/souvenirs/all`)
    if (!response.ok) {
      return [...staticPages]
    }
    souvenirs = await response.json()
  } catch (error) {
    return [...staticPages]
  }

  // 動的ページを生成
  const dynamicPages = souvenirs.map((souvenir: { alias_id: string, updated_at: string }) => ({
    url: `${url}/souvenirs/${souvenir.alias_id}`,
    lastModified: new Date(souvenir.updated_at),
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [...staticPages, ...dynamicPages]
}