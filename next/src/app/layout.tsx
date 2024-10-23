import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import DefaultTemplate from './components/templates/DefaultTemplate'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'お土産との出会いを見つけるサービス',
  description:
    '小さなお店で出会った可愛い雑貨や、ふらっと立ち寄ったカフェでつい買ってしまった美味しそうなお菓子...旅先では、どこでどんなお土産との出会いがあるかわかりません。そんな出会い一つ一つを記録して、あなただけの思い出コレクションを作りましょう。新しいお土産との出会いもきっと見つかるはず！',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <Providers>
          <ClerkProvider>
            <DefaultTemplate>{children}</DefaultTemplate>
          </ClerkProvider>
        </Providers>
      </body>
    </html>
  )
}
