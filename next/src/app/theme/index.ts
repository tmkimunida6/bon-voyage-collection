import { extendTheme } from '@chakra-ui/react'
import { Button } from './components/button'
import { Link } from './components/link'

const customTheme = extendTheme({
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
