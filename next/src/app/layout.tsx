import { Spinner, VStack } from '@chakra-ui/react'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import Toaster from '@/components/molecules/Toaster'
import DefaultTemplate from '@/components/templates/DefaultTemplate'
import { Providers } from '@/providers/providers'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Bon Voyage Collection | お土産との出会いを見つけるサービス',
  description:
    '小さなお店で出会った可愛い雑貨や、ふらっと立ち寄ったカフェでつい買ってしまった美味しそうなお菓子...旅先では、どこでどんなお土産との出会いがあるかわかりません。そんな出会い一つ一つを記録して、あなただけの思い出コレクションを作りましょう。新しいお土産との出会いもきっと見つかるはず！',
  keywords: 'お土産,Souvenir,SNS,発見,コレクション,Bon Voyage Collection',
  openGraph: {
    title: 'Bon Voyage Collection | お土産との出会いを見つけるサービス',
    description:
      '小さなお店で出会った可愛い雑貨や、ふらっと立ち寄ったカフェでつい買ってしまった美味しそうなお菓子...旅先では、どこでどんなお土産との出会いがあるかわかりません。そんな出会い一つ一つを記録して、あなただけの思い出コレクションを作りましょう。新しいお土産との出会いもきっと見つかるはず！',
    url: 'https://bon-voyage-collection.com/',
    siteName: 'Bon Voyage Collection',
    type: 'website',
  },
  twitter: {
    title: 'Bon Voyage Collection | お土産との出会いを見つけるサービス',
    description:
      '小さなお店で出会った可愛い雑貨や、ふらっと立ち寄ったカフェでつい買ってしまった美味しそうなお菓子...旅先では、どこでどんなお土産との出会いがあるかわかりません。そんな出会い一つ一つを記録して、あなただけの思い出コレクションを作りましょう。新しいお土産との出会いもきっと見つかるはず！',
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gaId = process.env.GA_ID || ''

  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicons/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicons/favicon.svg" />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Bon Voyage" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
      </head>
      <body>
        <Providers>
          <Suspense
            fallback={
              <VStack
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                spacing={4}
              >
                <Spinner size="xl" speed="0.5s" thickness="4px" />
              </VStack>
            }
          >
            <Toaster />
          </Suspense>
          <DefaultTemplate>{children}</DefaultTemplate>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
      <GoogleAnalytics gaId={gaId} />
    </html>
  )
}
