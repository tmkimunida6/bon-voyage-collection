import { extendTheme } from '@chakra-ui/react'
import { Noto_Sans_JP } from 'next/font/google'
import { Button } from './components/button'
import { Link } from './components/link'

const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  preload: false,
  display: 'swap',
  fallback: ['Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'sans-serif'],
})

const customTheme = extendTheme({
  fonts: {
    heading: notoSansJp.style.fontFamily,
    body: notoSansJp.style.fontFamily,
  },
  colors: {
    brand: {
      primary: '#E699AA',
      secondary: '#F2DEE8',
      gray: '#C8D0DB',
      brown: '#C69B92',
      link: '#88BFB8',
      star: '#E2DB87',
    },
  },
  components: {
    Button,
    Link,
  },
})

export default customTheme
