import { extendTheme } from '@chakra-ui/react'
import { Noto_Sans_JP } from 'next/font/google'
import { Button } from './components/button'
import { Form } from './components/form'
import { Link } from './components/link'
import { Tabs } from './components/tabs'

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
      primary: '#f3a16f',
      secondary: '#bb957f',
      black: '#333333',
      link: '#88BFB8',
      star: '#E2DB87',
    },
  },
  components: {
    Button,
    Link,
    Input: Form.Input,
    Select: Form.Select,
    Textarea: Form.Textarea,
    FormLabel: Form.FormLabel,
    Checkbox: Form.Checkbox,
    Tabs,
  },
  styles: {
    global: {
      html: {
        overflowX: 'hidden',
      },
      body: {
        bg: '#fef2da',
        color: 'brand.black',
      },
    },
  },
})

export default customTheme
